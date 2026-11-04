import assert from "node:assert/strict";
import test from "node:test";
import {
  back,
  canGoBack,
  canGoForward,
  currentEntry,
  forward,
  initialNavState,
  navigate,
  type NavState,
} from "./nav";

function labels(state: NavState): string[] {
  return state.entries.map((entry) =>
    entry.kind === "site" ? entry.address : entry.kind,
  );
}

function site(address: string) {
  return { kind: "site" as const, address };
}

test("a new visit after going back drops the forward entries", () => {
  let state = initialNavState();
  state = navigate(state, site("a.zz"), 0);
  state = navigate(state, site("b.zz"), 0);
  state = navigate(state, site("c.zz"), 0);
  state = navigate(state, site("d.zz"), 0);

  assert.deepEqual(labels(state), ["home", "a.zz", "b.zz", "c.zz", "d.zz"]);

  state = back(state, 0);
  state = back(state, 0);
  const atB = currentEntry(state);
  assert.equal(atB.kind, "site");
  assert.deepEqual(labels(state), ["home", "a.zz", "b.zz", "c.zz", "d.zz"]);
  assert.equal(atB.kind === "site" ? atB.address : "", "b.zz");
  assert.equal(canGoForward(state), true);

  state = navigate(state, site("e.zz"), 0);

  assert.deepEqual(labels(state), ["home", "a.zz", "b.zz", "e.zz"]);
  assert.equal(canGoForward(state), false);
});

test("back and forward stop at the ends", () => {
  let state = initialNavState();
  assert.equal(canGoBack(state), false);
  state = back(state, 0);
  assert.deepEqual(labels(state), ["home"]);

  state = navigate(state, site("a.zz"), 0);
  state = forward(state, 0);
  assert.deepEqual(labels(state), ["home", "a.zz"]);
  assert.equal(currentEntry(state).kind, "site");
});

test("scroll positions are stored on the page being left", () => {
  let state = initialNavState();
  state = navigate(state, site("a.zz"), 0);
  state = navigate(state, site("b.zz"), 120);
  state = back(state, 40);

  assert.equal(state.entries[1].scrollY, 120);
  assert.equal(state.entries[2].scrollY, 40);

  state = forward(state, 0);

  assert.equal(state.entries[1].scrollY, 0);
  assert.equal(state.entries[2].scrollY, 40);
});

test("search pages sit in the same stack as sites", () => {
  let state = initialNavState();
  state = navigate(state, { kind: "search", query: "artificial intelligence" }, 0);
  state = navigate(state, site("technology.zz"), 10);
  state = back(state, 50);

  assert.deepEqual(labels(state), ["home", "search", "technology.zz"]);
  const atSearch = currentEntry(state);
  assert.equal(atSearch.kind === "search" ? atSearch.query : "", "artificial intelligence");
  assert.equal(state.entries[1].scrollY, 10);
  assert.equal(state.entries[2].scrollY, 50);
});

test("each entry gets its own id", () => {
  let state = initialNavState();
  state = navigate(state, site("a.zz"), 0);
  state = navigate(state, site("b.zz"), 0);

  assert.deepEqual(
    state.entries.map((entry) => entry.id),
    [0, 1, 2],
  );
});
