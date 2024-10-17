import { Offer } from "./types";

export const ALTERNA_LOCAL_HPHC = {
  provider: "Alterna",
  name: "Local - HP/HC",
  type: "HPHC",
  prices: {
    6: {
      monthly: 14.31,
      HP: 0.2161,
      HC: 0.1668,
    },
    9: {
      monthly: 21.82,
      HP: 0.2161,
      HC: 0.1668,
    },
    12: {
      monthly: 21.82,
      HP: 0.2161,
      HC: 0.1668,
    },
    15: {
      monthly: 25.35,
      HP: 0.2161,
      HC: 0.1668,
    },

  },
} as Offer;

export const ALTERNA_LOCAL_BASE = {
    provider: "Alterna",
    name: "Local - Base",
    type: "BASE",
    prices: {
      3: {
        monthly: 10.56,
        Base: 0.2018,
      },
      6: {
        monthly: 13.86,
        Base: 0.2018,
      },
      9: {
        monthly: 17.41,
        Base: 0.2018,
      },
      12: {
        monthly: 21.02,
        Base: 0.2018,
      },
      15: {
        monthly: 24.39,
        Base: 0.2018,
      },
    },
  } as Offer;

export const ALTERNA_FRANCE_BASE = {
    provider: "Alterna",
    name: "France - Base",
    type: "BASE",
    prices: {
      3: {
        monthly: 10.56,
        Base: 0.1927,
      },
      6: {
        monthly: 13.86,
        Base: 0.1927,
      },
      9: {
        monthly: 17.41,
        Base: 0.1927,
      },
      12: {
        monthly: 21.02,
        Base: 0.1927,
      },
      15: {
        monthly: 24.39,
        Base: 0.1927,
      },
    },
  } as Offer;

export const ALTERNA_FRANCE_HPHC = {
    provider: "Alterna",
    name: "France - HP/HC",
    type: "HPHC",
    prices: {
      6: {
        monthly: 14.31,
        HP: 0.2064,
        HC: 0.1596,
      },
      9: {
        monthly: 21.82,
        HP: 0.2064,
        HC: 0.1596,
      },
      12: {
        monthly: 21.82,
        HP: 0.2064,
        HC: 0.1596,
      },
      15: {
        monthly: 25.35,
        HP: 0.2064,
        HC: 0.1596,
      },
    },
  } as Offer;
