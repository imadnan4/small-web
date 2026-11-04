import type {
  HistoryEntry,
  SearchResult,
  Site,
  SiteSummary,
  User,
  VisitVia,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string | string[] };
      if (typeof body.message === "string") {
        message = body.message;
      } else if (Array.isArray(body.message)) {
        message = body.message.join(", ");
      }
    } catch {
      // keep the status message
    }
    throw new ApiError(response.status, message);
  }

  return (await response.json()) as T;
}

export function getUsers(): Promise<User[]> {
  return request<User[]>("/users");
}

export function getSites(): Promise<SiteSummary[]> {
  return request<SiteSummary[]>("/sites");
}

export function getSite(address: string): Promise<Site> {
  return request<Site>(`/sites/${encodeURIComponent(address)}`);
}

export function searchSites(query: string): Promise<SearchResult[]> {
  return request<SearchResult[]>(`/sites/search?q=${encodeURIComponent(query)}`);
}

export function getHistory(user: string): Promise<HistoryEntry[]> {
  return request<HistoryEntry[]>(
    `/visits/history?user=${encodeURIComponent(user)}&limit=100`,
  );
}

export function recordVisit(
  user: string,
  address: string,
  via: VisitVia,
): Promise<unknown> {
  return request("/visits", {
    method: "POST",
    body: JSON.stringify({ user, address, via }),
  });
}

export function publishSite(input: {
  address: string;
  title: string;
  html: string;
  author: string;
}): Promise<Site> {
  return request<Site>("/sites", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
