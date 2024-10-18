export enum OfferType {
  Base = "BASE",
  HPHC = "HPHC",
}

export interface Offer {
  provider: string;
  reference?: boolean;
  name: string;
  type: OfferType;
  prices: {
    [power: number]: { [pricing: string]: number };
  };
}

export interface ComputedOffer {
  total: number;
  priceAnnual: number;
  subscription: number;
  [pricing: string]: any;
}

export interface ConsumptionPoint {
  date: string;
  time: string;
  utcOffset: string;
  conso: number /* W/30min => kW/h */;
}

export interface CsvData {
  conso: ConsumptionPoint[];
  infos: {
    [key: string]: string;
  };
  overallConso: {
    modificator: number;
    [key: string]: number | string;
  };
}

// {
//   date: date,
//   time: timeTimezone.slice(0, 8),
//   utcOffset: timeTimezone.slice(8),
//   conso: +conso / 2000.0 /* W/30min => kW/h */,
// }
// {
//   infos: infoObj,
//   conso: consoValues,
//   overallConso: {
//     [`Consommation totale du ${infoObj["Date de debut"]} au ${infoObj["Date de fin"]}`]: `${totalConso} kW/h`,
//     "Consommation totale estimée par an": `${Math.round(totalConso / modificator)} kW/h`,
//     modificator: modificator,
//   },
// }
