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
