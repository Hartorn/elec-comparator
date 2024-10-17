import { Fragment, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Plus} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { ConsommationChart } from "./components/chart";
import { calculateOffer, csvToObj } from "./data";
import offers from "./data/offers";
import HourRangeInput from "./components/hours";
import { Offer, OfferType } from "./data/types";

function padNumber(nb: number) {
  return ("" + nb).padStart(2, "0");
}

function App() {
  const [csv, setCsv] = useState(undefined);
  // const [hStart, setHStart] = useState(22);
  // const [hStop, setHStop] = useState(6);
  // const [minStart, setMinStart] = useState(38);
  // const [minStop, setMinStop] = useState(38);
  const [puissance, setPuissance] = useState(6);
  const [abo, setAbo] = useState(13.01);
  const [basekWh, setBasekWh] = useState(0.2516);
  const [hckWh, sethckWh] = useState(0.2068);
  const [hpkWh, sethpkWh] = useState(0.2700);

  const [typeAbo, setTypeAbo] = useState("HPHC");

  const [hourRanges, setHourRange] = useState([[22,38,6,38]]);


  const hcRanges = hourRanges.map( ([hStart, minStart, hStop, minStop]) =>  ([
    `${padNumber(hStart)}:${padNumber(minStart)}:00`,
    `${padNumber(hStop)}:${padNumber(minStop)}:00`,
  ]));
  // [
  //   [
  //     `${padNumber(hStart)}:${padNumber(minStart)}:00`,
  //     `${padNumber(hStop)}:${padNumber(minStop)}:00`,
  //   ],
  // ];
  const referenceOffer : Offer = {
    provider: "",
    reference: true,
    name: "Offre actuelle",
    type: typeAbo as OfferType,
    prices: {
      [puissance]: {
        monthly: abo,
        ...((typeAbo == "BASE" && {Base: basekWh}) ?? {}),
        ...((typeAbo == "HPHC" && {HP: hpkWh, HC: hckWh}) ?? {}),
      }}};

  const computedOffers = csv?.conso
    ? offers.concat([referenceOffer])
        .filter((offer) => offer.prices[puissance])
        .map((offer) => ({
          ...offer,
          ...calculateOffer(
            csv?.conso,
            csv.overallConso.modificator,
            puissance,
            offer,
            hcRanges,
          ),
        }))
    : [];
  computedOffers.sort((elt, elt2) => elt.total - elt2.total);
  return (
    <>
      <div className="grid flex-1 items-start gap-4 p-4">
        <div className="mx-auto grid max-w-full md:min-w-[60rem] md:max-w-[60rem] flex-1 auto-rows-max gap-4">
          <div className="grid gap-4">
            <div className="grid auto-rows-max items-start gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Données necessaires</CardTitle>
                  <CardDescription>
                    Remplissez ces quelques informations pour estimer au plus
                    juste votre consommation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-y-4">
                    <Label className="flex-auto">Mes heures creuses
                    <Button className="ml-2" variant="outline" size="icon" onClick={() => setHourRange(hourRanges.concat([[22,38,6,38]]))}>
                      <Plus className="h-4 w-4" />
                    </Button></Label>
                    {hourRanges.map((elt, i) => (<HourRangeInput key={i} values={elt} onChange={elt => setHourRange(hourRanges.map((e, j) => i == j ? elt : e)) }/>))}
                    <div className="grid gap-4 md:grid-cols-4 grid-cols-1 flex items-center">
                      <Label htmlFor="puissance" className="flex-auto">
                        Puissance d'abonnement (kVA)
                      </Label>
                      <Input
                        id="puissance"
                        type="number"
                        value={puissance}
                        onChange={(elt) => setPuissance(elt.target.value)}
                        min="3"
                        max="36"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


          <div className="grid gap-4">
            <div className="grid auto-rows-max items-start gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Offre actuel</CardTitle>
                  <CardDescription>
                    Remplissez ici vos informations pour comparer à votre offre actuelle.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid gap-y-4">

                <div className="grid gap-4 md:grid-cols-4 grid-cols-1 flex items-center">
                      <Label htmlFor="puissance" className="flex-auto">
                        Abonnement mensuel TTC
                      </Label>
                      <Input
                        id="abo"
                        type="number"
                        value={abo}
                        onChange={(elt) => setAbo(elt.target.value)}
                      />
                  </div>
                  <div className="grid gap-4 md:grid-cols-4 grid-cols-1 flex items-center">
                    <Label htmlFor="puissance" className="flex-auto">
                        Abonnement mensuel TTC
                      </Label>
                      <RadioGroup value={typeAbo} onClick={elt => elt?.target?.value && setTypeAbo(elt?.target?.value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="HPHC" id="r1" />
                        <Label htmlFor="r1">HC/HP</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="BASE" id="r2" />
                        <Label htmlFor="r2">Base</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {typeAbo == "BASE" && <div className="grid gap-4 md:grid-cols-4 grid-cols-1 flex items-center">
                      <Label htmlFor="basekWh" className="flex-auto">
                        Prix kWh (TTC)
                      </Label>
                      <Input
                        id="basekWh"
                        type="number"
                        value={basekWh}
                        onChange={(elt) => setBasekWh(elt.target.value)}
                      />
                  </div>}

                  {typeAbo == "HPHC" && <>
                    <div className="grid gap-4 md:grid-cols-4 grid-cols-1 flex items-center">
                        <Label htmlFor="hpkWh" className="flex-auto">
                          Prix HP kWh (TTC)
                        </Label>
                        <Input
                          id="hpkWh"
                          type="number"
                          value={hpkWh}
                          onChange={(elt) => sethpkWh(elt.target.value)}
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-4 grid-cols-1 flex items-center">
                        <Label htmlFor="hckWh" className="flex-auto">
                          Prix HC kWh (TTC)
                        </Label>
                        <Input
                          id="hckWh"
                          type="number"
                          value={hckWh}
                          onChange={(elt) => sethckWh(elt.target.value)}
                        />
                    </div>
                  </>
                  }

                </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid auto-rows-max items-start gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Import de votre consomation</CardTitle>
                  <CardDescription>
                    Importez ici votre fichier de votre consommation horaire,
                    téléchargé depuis Enedis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    id="file"
                    type="file"
                    onChange={({ target: { files: selectorFiles } }) => {
                      if (selectorFiles.length <= 0) {
                        setCsv(undefined);
                        return;
                      }
                      const file: File = selectorFiles[0];
                      file.text().then((elt) => setCsv(csvToObj(elt)));
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          {csv?.infos && (
            <div className="grid gap-4">
              <div className="grid auto-rows-max items-start gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé de votre fichier importé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 grid-cols-1 flex items-center">
                      {Object.entries(csv.overallConso)
                        .filter(([k, _]) => k != "modificator")
                        .map(([k, v]) => (
                          <Fragment key={k}>
                            <h4 className="font-semibold leading-none">{k}</h4>
                            <p className="text-sm font-medium leading-none">
                              {v}
                            </p>
                          </Fragment>
                        ))}
                    </div>
                    <div className="p-4">
                      <Separator />
                    </div>
                    <div className="grid gap-x-2 gap-y-2 md:grid-cols-4 grid-cols-1 flex items-center">
                      {Object.entries(csv.infos).map(([k, v]) => (
                        <Fragment key={k}>
                          <h4 className="font-semibold leading-none">{k}</h4>
                          <p className="text-sm font-medium leading-none">
                            {v}
                          </p>
                        </Fragment>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {csv?.conso && csv.conso.length > 0 && (
            <div className="grid gap-4">
              <div className="grid auto-rows-max items-start gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé de votre consomation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ConsommationChart rawConso={csv.conso} ranges={hcRanges} />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {csv?.conso && csv.conso.length > 0 && (
            <div className="grid gap-4">
              <div className="grid auto-rows-max items-start gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Offres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* {JSON.stringify(
                      computedOffers
                    )}
 */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fournisseur</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Offre
                          </TableHead>
                          <TableHead className="hidden sm:table-cell text-right">
                            Prix annuel de l'abonnement
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-right">
                            Prix annuel de la consommation
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-right">
                            Total annuel
                          </TableHead>
                          <TableHead className="text-right">
                            Total mensuel
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {computedOffers.map((elt) => (
                          <TableRow key={elt.name} className={elt.reference ? "current-offer" : ""}>
                            <TableCell className="hidden sm:table-cell">
                              {elt.provider}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {elt.name}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-right">
                              {Math.round(elt.subscription * 100) / 100}€
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-right">
                              {Math.round(elt.priceAnnual * 100) / 100}€
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {Math.round(elt.total * 100) / 100}€
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {Math.round((elt.total / 12.0) * 100) / 100}€
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
