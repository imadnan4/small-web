"use client";

import { useEffect, useState } from "react";
import { getHistory } from "@/lib/api";
import { formatVisitTime } from "@/lib/format";
import type { HistoryEntry, VisitVia } from "@/lib/types";

const VIA_LABEL: Record<VisitVia, string> = {
  typed: "typed",
  link: "followed a link",
  back: "back",
  forward: "forward",
  history: "from history",
  search: "from search",
  publish: "after publishing",
};

type Props = {
  open: boolean;
  user: string;
  onClose: () => void;
  onSelect: (address: string) => void;
};

export default function HistoryPanel({ open, user, onClose, onSelect }: Props) {
  const [visits, setVisits] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !user) {
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    getHistory(user)
      .then((data) => {
        if (!cancelled) {
          setVisits(data);
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(reason instanceof Error ? reason.message : "Could not load history.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, user]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-title"
      >
        <header className="drawer-header">
          <div>
            <p className="kicker">History</p>
            <h2 id="history-title">{user || "Nobody yet"}</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close history"
          >
            ×
          </button>
        </header>

        <div className="drawer-body">
          {!user ? <p className="muted">Pick a browsing name first.</p> : null}
          {loading ? <p className="muted">Loading visits...</p> : null}
          {error ? <p className="notice error">{error}</p> : null}

          {!loading && !error && user && visits.length === 0 ? (
            <p className="muted">No visits yet. Open a page.</p>
          ) : null}

          <ol className="history-list">
            {visits.map((visit) => (
              <li key={visit._id}>
                <button
                  className="history-item"
                  onClick={() => onSelect(visit.address)}
                >
                  <span className="history-title">{visit.title}</span>
                  <span className="history-address">{visit.address}</span>
                  <span className="history-meta">
                    {formatVisitTime(visit.visitedAt)} · {VIA_LABEL[visit.via]}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
