import { Offer } from "./types";

export const Base = {
  provider: "EDF",
  name: "Tarif Bleu Ciel - Base",
  type: "BASE",
  prices: {
    3: {
      monthly: 9.63,
      Base: 0.2516,
    },
    6: {
      monthly: 12.6,
      Base: 0.2516,
    },
    9: {
      monthly: 15.79,
      Base: 0.2516,
    },
    12: {
      monthly: 19.04,
      Base: 0.2516,
    },
    15: {
      monthly: 22.07,
      Base: 0.2516,
    },
    18: {
      monthly: 25.09,
      Base: 0.2516,
    },
    24: {
      monthly: 31.79,
      Base: 0.2516,
    },
    30: {
      monthly: 37.44,
      Base: 0.2516,
    },
    36: {
      monthly: 44.82,
      Base: 0.2516,
    },
  },
} as Offer;

export const HPHC = {
  provider: "EDF",
  name: "Tarif Bleu Ciel - HP/HC",
  type: "HPHC",
  prices: {
    6: {
      monthly: 13.01,
      HP: 0.27,
      HC: 0.2068,
    },
    9: {
      monthly: 16.7,
      HP: 0.27,
      HC: 0.2068,
    },
    12: {
      monthly: 20.13,
      HP: 0.27,
      HC: 0.2068,
    },
    15: {
      monthly: 23.4,
      HP: 0.27,
      HC: 0.2068,
    },
    18: {
      monthly: 26.64,
      HP: 0.27,
      HC: 0.2068,
    },
    24: {
      monthly: 33.34,
      HP: 0.27,
      HC: 0.2068,
    },
    30: {
      monthly: 39.63,
      HP: 0.27,
      HC: 0.2068,
    },
    36: {
      monthly: 44.79,
      HP: 0.27,
      HC: 0.2068,
    },
  },
} as Offer;
