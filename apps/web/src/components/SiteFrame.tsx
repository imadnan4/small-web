"use client";

import { useEffect, useRef, type RefObject } from "react";
import { isValidAddress, normalizeAddress } from "@/lib/address";

const FRAME_CSS = `
  :root { color-scheme: light; }
  html, body { margin: 0; padding: 0; }
  body {
    background: #fffdf8;
    color: #1d2a24;
    font-family: ui-serif, Georgia, "Times New Roman", serif;
    font-size: 18px;
    line-height: 1.65;
    padding: 48px 28px 80px;
    overflow-wrap: anywhere;
  }
  body > * { max-width: 680px; margin-left: auto; margin-right: auto; }
  h1, h2, h3, h4, h5, h6 {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.15;
    color: #17251e;
  }
  h1 { font-size: 2.15em; letter-spacing: -0.02em; margin: 0 0 0.55em; }
  h2 { font-size: 1.35em; margin: 1.8em 0 0.4em; }
  h3 { font-size: 1.1em; margin: 1.5em 0 0.3em; }
  p { margin: 0 0 1em; }
  a { color: #1f6b53; text-decoration: underline; text-underline-offset: 2px; }
  a:hover { color: #144b3a; }
  ul, ol { padding-left: 1.35em; }
  li { margin: 0.35em 0; }
  blockquote {
    border-left: 3px solid #c8d3cd;
    margin: 28px 0;
    padding: 4px 0 4px 20px;
    color: #43554c;
    font-style: italic;
  }
  pre {
    background: #f1f4f1;
    border: 1px solid #d9e1dc;
    border-radius: 8px;
    padding: 16px;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.5;
  }
  code {
    background: #f1f4f1;
    border-radius: 4px;
    padding: 1px 4px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9em;
  }
  pre code { background: none; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 24px 0; font-size: 0.95em; }
  th, td { border-bottom: 1px solid #d9e1dc; text-align: left; padding: 8px 10px; }
  th {
    color: #5b6b62;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 0.8em;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  hr { border: 0; border-top: 1px solid #d9e1dc; margin: 40px 0; }
  ::selection { background: #dcebe2; }
`;

function documentFor(html: string): string {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; font-src 'none'; media-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">
<style>${FRAME_CSS}</style>
</head>
<body>${html}</body>
</html>`;
}

type Props = {
  address: string;
  html: string;
  scrollY: number;
  onNavigate: (address: string) => void;
  frameRef?: RefObject<HTMLIFrameElement | null>;
};

export default function SiteFrame({
  address,
  html,
  scrollY,
  onNavigate,
  frameRef,
}: Props) {
  const localRef = useRef<HTMLIFrameElement>(null);
  const ref = frameRef ?? localRef;
  const onNavigateRef = useRef(onNavigate);
  const attachedDocument = useRef<Document | null>(null);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    const frame = ref.current;
    if (!frame?.contentWindow) {
      return;
    }
    frame.contentWindow.scrollTo(0, scrollY);
  }, [ref, scrollY, html]);

  function handleLoad() {
    const frame = ref.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    if (!win || !doc) {
      return;
    }

    win.scrollTo(0, scrollY);

    if (attachedDocument.current === doc) {
      return;
    }
    attachedDocument.current = doc;

    doc.addEventListener("click", (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) {
        return;
      }

      event.preventDefault();
      const next = normalizeAddress(href);
      if (isValidAddress(next)) {
        onNavigateRef.current(next);
      }
    });
  }

  return (
    <iframe
      ref={ref}
      className="site-frame"
      title={`Page at ${address}`}
      sandbox="allow-same-origin"
      referrerPolicy="no-referrer"
      srcDoc={documentFor(html)}
      onLoad={handleLoad}
    />
  );
}
