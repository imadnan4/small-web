import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeSiteHtml } from "./sanitize";

test("strips scripts, handlers, and links that leave the small web", () => {
  const { html } = sanitizeSiteHtml(`
    <p onclick="alert(1)">Hello <a href="javascript:alert(1)">there</a>.</p>
    <script>alert("x")</script>
    <a href="https://example.com">outside</a>
  `);

  assert.doesNotMatch(html, /script/i);
  assert.doesNotMatch(html, /onclick/i);
  assert.doesNotMatch(html, /javascript/i);
  assert.doesNotMatch(html, /example\.com/i);
  assert.match(html, /Hello/);
  assert.match(html, /outside/);
});

test("keeps links to small web addresses", () => {
  const { html } = sanitizeSiteHtml(
    '<a href="https://Tidepool.zz/">the pool</a>',
  );

  assert.match(html, /href="tidepool\.zz"/);
});

test("strips images, forms, and meta refresh", () => {
  const { html } = sanitizeSiteHtml(`
    <meta http-equiv="refresh" content="0;url=https://example.com">
    <form action="/send"><input name="q"><button>Go</button></form>
    <img src="https://example.com/tracker.gif">
  `);

  assert.doesNotMatch(html, /meta|form|input|button|img|example\.com/i);
});

test("extracts readable text from block markup", () => {
  const { text } = sanitizeSiteHtml(
    "<h1>Title</h1><p>First sentence.</p><ul><li>One</li><li>Two</li></ul>",
  );

  assert.equal(text, "Title First sentence. One Two");
});
