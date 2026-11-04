import type { VisitVia } from "../visits/visit.schema";

export type SeedVisit = {
  user: string;
  address: string;
  offsetMinutes: number;
  via: VisitVia;
};

export const SEED_VISIT_BASE_TIME = Date.UTC(2026, 10, 2, 18, 0, 0);

export const SEED_VISITS: SeedVisit[] = [
  { user: "Mina Farooq", address: "tidepool.zz", offsetMinutes: 0, via: "typed" },
  { user: "Mina Farooq", address: "fieldnotes.zz", offsetMinutes: 4, via: "link" },
  { user: "Mina Farooq", address: "technology.zz", offsetMinutes: 9, via: "link" },
  { user: "Mina Farooq", address: "radio-static.zz", offsetMinutes: 13, via: "link" },
  { user: "Mina Farooq", address: "coffeehouse.zz", offsetMinutes: 17, via: "link" },
  { user: "Mina Farooq", address: "night-market.zz", offsetMinutes: 21, via: "link" },
  { user: "Mina Farooq", address: "kitchen.zz", offsetMinutes: 24, via: "link" },
  { user: "Mina Farooq", address: "football.zz", offsetMinutes: 29, via: "typed" },
  { user: "Mina Farooq", address: "harbor.zz", offsetMinutes: 35, via: "link" },
  { user: "Mina Farooq", address: "repair-manual.zz", offsetMinutes: 40, via: "link" },
  { user: "Mina Farooq", address: "tidepool.zz", offsetMinutes: 45, via: "history" },
  { user: "Mina Farooq", address: "coffeehouse.zz", offsetMinutes: 52, via: "history" },

  { user: "Owen Blake", address: "coffeehouse.zz", offsetMinutes: 2, via: "typed" },
  { user: "Owen Blake", address: "fieldnotes.zz", offsetMinutes: 7, via: "link" },
  { user: "Owen Blake", address: "tidepool.zz", offsetMinutes: 12, via: "link" },
  { user: "Owen Blake", address: "coffeehouse.zz", offsetMinutes: 20, via: "history" },
  { user: "Owen Blake", address: "radio-static.zz", offsetMinutes: 26, via: "link" },
  { user: "Owen Blake", address: "night-market.zz", offsetMinutes: 34, via: "link" },

  { user: "Priya Nair", address: "football.zz", offsetMinutes: 5, via: "typed" },
  { user: "Priya Nair", address: "technology.zz", offsetMinutes: 11, via: "link" },
  { user: "Priya Nair", address: "repair-manual.zz", offsetMinutes: 18, via: "link" },
  { user: "Priya Nair", address: "football.zz", offsetMinutes: 25, via: "back" },
  { user: "Priya Nair", address: "harbor.zz", offsetMinutes: 31, via: "link" },

  { user: "Tomas Reed", address: "harbor.zz", offsetMinutes: 10, via: "typed" },
  { user: "Tomas Reed", address: "tidepool.zz", offsetMinutes: 16, via: "link" },
  { user: "Tomas Reed", address: "repair-manual.zz", offsetMinutes: 25, via: "link" },
  { user: "Tomas Reed", address: "technology.zz", offsetMinutes: 33, via: "link" },

  { user: "Ayesha Khan", address: "kitchen.zz", offsetMinutes: 15, via: "typed" },
  { user: "Ayesha Khan", address: "night-market.zz", offsetMinutes: 22, via: "link" },
  { user: "Ayesha Khan", address: "fieldnotes.zz", offsetMinutes: 38, via: "link" },
];
