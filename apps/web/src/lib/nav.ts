export type NavEntry =
  | { id: number; scrollY: number; kind: "home" }
  | { id: number; scrollY: number; kind: "site"; address: string }
  | { id: number; scrollY: number; kind: "search"; query: string };

export type NewEntry =
  | { kind: "site"; address: string }
  | { kind: "search"; query: string };

export type NavState = {
  entries: NavEntry[];
  index: number;
  nextId: number;
};

export function initialNavState(): NavState {
  return {
    entries: [{ id: 0, scrollY: 0, kind: "home" }],
    index: 0,
    nextId: 1,
  };
}

export function currentEntry(state: NavState): NavEntry {
  return state.entries[state.index];
}

export function canGoBack(state: NavState): boolean {
  return state.index > 0;
}

export function canGoForward(state: NavState): boolean {
  return state.index < state.entries.length - 1;
}

export function navigate(
  state: NavState,
  entry: NewEntry,
  currentScroll: number,
): NavState {
  const entries = state.entries.slice(0, state.index + 1);
  entries[state.index] = { ...entries[state.index], scrollY: currentScroll };

  const next = { ...entry, id: state.nextId, scrollY: 0 } as NavEntry;
  entries.push(next);

  return {
    entries,
    index: entries.length - 1,
    nextId: state.nextId + 1,
  };
}

export function back(state: NavState, currentScroll: number): NavState {
  if (!canGoBack(state)) {
    return state;
  }

  const entries = [...state.entries];
  entries[state.index] = { ...entries[state.index], scrollY: currentScroll };

  return { ...state, entries, index: state.index - 1 };
}

export function forward(state: NavState, currentScroll: number): NavState {
  if (!canGoForward(state)) {
    return state;
  }

  const entries = [...state.entries];
  entries[state.index] = { ...entries[state.index], scrollY: currentScroll };

  return { ...state, entries, index: state.index + 1 };
}
