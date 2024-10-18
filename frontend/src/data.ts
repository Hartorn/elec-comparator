import {
  ComputedOffer,
  ConsumptionPoint,
  CsvData,
  Offer,
  OfferType,
} from "./data/types";

function buildHpHcMapping(ranges: string[][]) {
  const predicate = (_: string, time: string) =>
    // 00h56 à 6h38 => time >= start && time < end
    // 22h30 à 6h38 => time >= start || time < end
    // start > end ? (time >= start || time < end) : (time >= start && time < end)

    ranges.some(([start, end]) =>
      start > end ? time >= start || time < end : time >= start && time < end,
    );
  return {
    HP: (date: string, time: string) => !predicate(date, time),
    HC: predicate,
  };
}

export function aggregateValues(
  consoValues: ConsumptionPoint[],
  ranges: string[][],
  maxDateSlice: number | undefined = undefined,
) {
  const hourMapping = buildHpHcMapping(ranges);
  const dateConso = consoValues.reduce(
    (acc, elt: ConsumptionPoint) => {
      // const { conso, date, time } = elt;
      const newConso = aggregateConso(elt, hourMapping);
      const aggKey = elt.date.slice(0, maxDateSlice);
      if (acc[aggKey]) {
        Object.keys(newConso).forEach((key) => {
          acc[aggKey][key] += newConso[key];
        });
      } else {
        acc[aggKey] = newConso;
      }
      return acc;
    },
    {} as { [key: string]: { [key: string]: number } },
  );
  return Object.entries(dateConso).map(([date, conso]) => ({
    date: date,
    ...conso,
  }));
}

export function aggregateConso(
  { conso, date, time }: ConsumptionPoint,
  mapping: Object,
) {
  const initalObj: { [key: string]: number } = Object.keys(mapping).reduce(
    (acc, key) => ({ [key]: 0, ...acc }),
    {},
  );
  return Object.entries(mapping).reduce((acc, [key, predicate]) => {
    if (predicate(date, time)) {
      acc[key] += conso;
    }
    return acc;
  }, initalObj);
}

export function csvToObj(csv: string): CsvData {
  const [headerStr, infosStr, _, ...consoStrLines] = csv.split("\n");
  const header = headerStr.split(";");
  const info = infosStr.split(";");

  const infoObj = header.reduce(
    (acc, elt, i) => {
      acc[elt] = info[i];
      return acc;
    },
    {} as {
      [key: string]: string;
    },
  );

  const consoValues: ConsumptionPoint[] = consoStrLines
    .filter((elt) => elt.trim())
    .map((line) => {
      const [fullDate, conso] = line.split(";");
      const [date, timeTimezone] = fullDate.split("T");
      return {
        date: date,
        time: timeTimezone.slice(0, 8),
        utcOffset: timeTimezone.slice(8),
        conso: +conso / 2000.0 /* W/30min => kW/h */,
      };
    });

  const [endPeriod, startPeriod] = [
    consoValues[consoValues.length - 1],
    consoValues[0],
  ].map(({ date, time, utcOffset }) =>
    Date.parse(date + "T" + time + utcOffset),
  );
  const modificator = (endPeriod - startPeriod) / (24 * 3600 * 1000 * 365.25);
  const totalConso = Math.round(
    consoValues.reduce((acc, { conso }) => acc + conso, 0),
  );
  return {
    infos: infoObj,
    conso: consoValues,
    overallConso: {
      [`Consommation totale du ${infoObj["Date de debut"]} au ${infoObj["Date de fin"]}`]: `${totalConso} kW/h`,
      "Consommation totale estimée par an": `${Math.round(totalConso / modificator)} kW/h`,
      modificator: modificator,
    },
  };
}

export function calculateOffer(
  consoArr: ConsumptionPoint[],
  modificator: number,
  puissance: number,
  offer: Offer,
  ranges: string[][],
): ComputedOffer {
  if (offer.type == OfferType.Base) {
    const consoAnnual =
      consoArr.reduce((acc, { conso }) => acc + conso, 0) / modificator;
    const price = offer.prices[puissance];
    const priceAnnual = consoAnnual * price.Base;
    const subscription = 12 * price.monthly;

    return {
      total: priceAnnual + subscription,
      priceAnnual: priceAnnual,
      subscription: subscription,
    };
  }
  if (offer.type == OfferType.HPHC) {
    const { date: _, ...consoAnnual } = aggregateValues(consoArr, ranges, 0)[0];
    // const consoAnnual = consoArr.reduce((acc, { conso, date, time }) => acc + conso, 0) / modificator;
    const priceAnnual: { [priceType: string]: number } = Object.entries<number>(
      consoAnnual,
    ).reduce(
      (acc, [priceType, conso]) => ({
        ...acc,
        [priceType]: (conso / modificator) * offer.prices[puissance][priceType],
      }),
      {},
    );

    const price = offer.prices[puissance];
    const subscription = 12 * price.monthly;
    const priceAnnualSum = Object.values(priceAnnual).reduce(
      (acc, elt) => acc + elt,
      0,
    );
    return {
      total: priceAnnualSum + subscription,
      priceAnnual: priceAnnualSum,
      subscription: subscription,
      details: priceAnnual,
      consoAnnual: consoAnnual,
    };
  }
  throw "Not handled: " + offer.type;
}
