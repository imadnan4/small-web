import sanitizeHtml from "sanitize-html";
import { isValidAddress, normalizeAddress } from "./address";

const ALLOWED_TAGS = [
  "a",
  "abbr",
  "article",
  "aside",
  "b",
  "blockquote",
  "br",
  "caption",
  "cite",
  "code",
  "dd",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "i",
  "li",
  "main",
  "mark",
  "nav",
  "ol",
  "p",
  "pre",
  "q",
  "s",
  "section",
  "small",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "u",
  "ul",
];

export type SiteContent = {
  html: string;
  text: string;
};

export function sanitizeSiteHtml(input: string): SiteContent {
  const html = sanitizeHtml(input, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href"],
      "*": ["id", "title"],
    },
    disallowedTagsMode: "discard",
    transformTags: {
      a: (tagName, attributes) => {
        const href = attributes.href?.trim();

        if (!href || href.startsWith("#")) {
          return { tagName, attribs: href ? { ...attributes, href } : attributes };
        }

        const { href: _originalHref, ...rest } = attributes;
        const address = normalizeAddress(href);
        return {
          tagName,
          attribs: isValidAddress(address) ? { ...rest, href: address } : rest,
        };
      },
    },
  });

  const spaced = html
    .replace(/<\/(p|div|h[1-6]|li|tr|section|article|blockquote|pre|td|th)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ");

  const text = sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();

  return { html, text };
}
