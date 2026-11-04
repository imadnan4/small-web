"use client";

import { useEffect, useState, type FormEvent } from "react";
import { publishSite } from "@/lib/api";
import type { User } from "@/lib/types";

type Props = {
  open: boolean;
  users: User[];
  currentUser: string;
  onClose: () => void;
  onPublished: (address: string) => void;
};

export default function PublishPanel({
  open,
  users,
  currentUser,
  onClose,
  onPublished,
}: Props) {
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setAuthor(currentUser);
      setError("");
    }
  }, [open, currentUser]);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const site = await publishSite({ address, title, html, author });
      setAddress("");
      setTitle("");
      setHtml("");
      onPublished(site.address);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not publish the page.");
    } finally {
      setSubmitting(false);
    }
  }

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
        aria-labelledby="publish-title"
      >
        <header className="drawer-header">
          <div>
            <p className="kicker">Publish</p>
            <h2 id="publish-title">Add a page</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close publish form"
          >
            ×
          </button>
        </header>

        <form className="drawer-body form" onSubmit={handleSubmit}>
          <label>
            <span>Address</span>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="myblog.zz"
              required
            />
          </label>

          <label>
            <span>Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="A page about something"
              required
            />
          </label>

          <label>
            <span>Author</span>
            <select
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            >
              {users.map((user) => (
                <option key={user._id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>HTML</span>
            <textarea
              value={html}
              onChange={(event) => setHtml(event.target.value)}
              rows={10}
              placeholder="<h1>My page</h1><p>Something worth reading.</p>"
              required
            />
          </label>

          <p className="form-hint">
            Scripts, styles, images, forms, and links that leave the small web are
            removed. Links to other .zz addresses stay in the browser.
          </p>

          {error ? <p className="notice error">{error}</p> : null}

          <div className="form-actions">
            <button type="button" className="button quiet" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button" disabled={submitting}>
              {submitting ? "Publishing..." : "Publish page"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
