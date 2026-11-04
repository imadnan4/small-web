export type User = {
  _id: string;
  name: string;
};

export type SiteSummary = {
  address: string;
  title: string;
  author: string;
};

export type Site = SiteSummary & {
  html: string;
};

export type SearchResult = SiteSummary & {
  snippet: string;
};

export const VISIT_VIA = [
  "typed",
  "link",
  "back",
  "forward",
  "history",
  "search",
  "publish",
] as const;

export type VisitVia = (typeof VISIT_VIA)[number];

export type HistoryEntry = {
  _id: string;
  user: string;
  address: string;
  visitedAt: string;
  via: VisitVia;
  title: string;
};
