"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import HistoryPanel from "./HistoryPanel";
import HomeView from "./HomeView";
import NotFoundView from "./NotFoundView";
import PublishPanel from "./PublishPanel";
import SearchView from "./SearchView";
import SiteFrame from "./SiteFrame";
import Toolbar from "./Toolbar";
import {
  ApiError,
  getSite,
  getSites,
  getUsers,
  recordVisit,
  searchSites,
} from "@/lib/api";
import { isValidAddress, normalizeAddress } from "@/lib/address";
import {
  back,
  canGoBack,
  canGoForward,
  currentEntry,
  forward,
  initialNavState,
  navigate,
  type NavState,
} from "@/lib/nav";
import type {
  SearchResult,
  Site,
  SiteSummary,
  User,
  VisitVia,
} from "@/lib/types";

export default function Browser() {
  const [nav, setNav] = useState<NavState>(initialNavState);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [directory, setDirectory] = useState<SiteSummary[]>([]);
  const [directoryLoading, setDirectoryLoading] = useState(true);
  const [bootError, setBootError] = useState("");

  const [site, setSite] = useState<Site | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pageError, setPageError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [toolbarError, setToolbarError] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  const siteFrameRef = useRef<HTMLIFrameElement>(null);
  const pageScrollRef = useRef<HTMLDivElement>(null);
  const viaRef = useRef<VisitVia>("typed");
  const currentUserRef = useRef("");

  const entry = currentEntry(nav);

  useEffect(() => {
    let cancelled = false;
    setDirectoryLoading(true);

    Promise.allSettled([getUsers(), getSites()]).then(
      ([usersResult, sitesResult]) => {
        if (cancelled) {
          return;
        }

        if (usersResult.status === "fulfilled") {
          setUsers(usersResult.value);
          const saved = window.localStorage.getItem("small-web-user");
          const selected =
            usersResult.value.find((user) => user.name === saved)?.name ??
            usersResult.value[0]?.name ??
            "";
          setCurrentUser(selected);
        } else {
          setBootError(
            usersResult.reason instanceof Error
              ? usersResult.reason.message
              : "Could not load the people.",
          );
        }

        if (sitesResult.status === "fulfilled") {
          setDirectory(sitesResult.value);
        } else {
          setBootError(
            sitesResult.reason instanceof Error
              ? sitesResult.reason.message
              : "Could not load the directory.",
          );
        }

        setDirectoryLoading(false);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    currentUserRef.current = currentUser;
    if (currentUser) {
      window.localStorage.setItem("small-web-user", currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    let cancelled = false;
    setPageError("");
    setNotFound(false);
    setSite(null);
    setSearchResults([]);

    if (entry.kind === "home") {
      setLoading(false);
      return;
    }

    setLoading(true);

    if (entry.kind === "site") {
      getSite(entry.address)
        .then((data) => {
          if (cancelled) {
            return;
          }
          setSite(data);
          if (currentUserRef.current) {
            recordVisit(currentUserRef.current, entry.address, viaRef.current).catch(
              () => undefined,
            );
          }
        })
        .catch((reason: unknown) => {
          if (cancelled) {
            return;
          }
          if (reason instanceof ApiError && reason.status === 404) {
            setNotFound(true);
          } else {
            setPageError(
              reason instanceof Error ? reason.message : "Could not load the page.",
            );
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
    }

    searchSites(entry.query)
      .then((data) => {
        if (!cancelled) {
          setSearchResults(data);
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setPageError(
            reason instanceof Error ? reason.message : "Could not search the web.",
          );
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
  }, [entry.id, reloadKey]);

  useEffect(() => {
    setToolbarError("");

    if (entry.kind === "site") {
      setAddress(entry.address);
    } else if (entry.kind === "search") {
      setAddress(`search://${entry.query}`);
      setSearchQuery(entry.query);
    } else {
      setAddress("");
    }
  }, [entry.id, entry.kind]);

  useEffect(() => {
    if (entry.kind === "site" || loading) {
      return;
    }
    const container = pageScrollRef.current;
    if (container) {
      container.scrollTop = entry.scrollY;
    }
  }, [entry.id, entry.kind, entry.scrollY, loading]);

  const currentScroll = useCallback(() => {
    if (siteFrameRef.current) {
      return siteFrameRef.current.contentWindow?.scrollY ?? 0;
    }
    return pageScrollRef.current?.scrollTop ?? 0;
  }, []);

  const navigateTo = useCallback(
    (target: string, via: VisitVia) => {
      viaRef.current = via;
      const scroll = currentScroll();
      setNav((state) => navigate(state, { kind: "site", address: target }, scroll));
    },
    [currentScroll],
  );

  const runSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const scroll = currentScroll();
      setNav((state) => navigate(state, { kind: "search", query }, scroll));
    },
    [currentScroll],
  );

  const goBack = useCallback(() => {
    if (!canGoBack(nav)) {
      return;
    }
    viaRef.current = "back";
    const scroll = currentScroll();
    setNav((state) => back(state, scroll));
  }, [nav, currentScroll]);

  const goForward = useCallback(() => {
    if (!canGoForward(nav)) {
      return;
    }
    viaRef.current = "forward";
    const scroll = currentScroll();
    setNav((state) => forward(state, scroll));
  }, [nav, currentScroll]);

  const openLink = useCallback(
    (target: string) => navigateTo(target, "link"),
    [navigateTo],
  );

  const jumpToHistory = useCallback(
    (target: string) => {
      setHistoryOpen(false);
      navigateTo(target, "history");
    },
    [navigateTo],
  );

  const handlePublished = useCallback(
    (published: string) => {
      setPublishOpen(false);
      getSites().then(setDirectory).catch(() => undefined);
      navigateTo(published, "publish");
    },
    [navigateTo],
  );

  const openHistory = useCallback(() => setHistoryOpen(true), []);
  const closeHistory = useCallback(() => setHistoryOpen(false), []);
  const openPublish = useCallback(() => setPublishOpen(true), []);
  const closePublish = useCallback(() => setPublishOpen(false), []);
  const handleUserChange = useCallback((name: string) => setCurrentUser(name), []);
  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  function handleAddressSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = address.trim();

    if (!raw) {
      setToolbarError("Type an address first.");
      return;
    }

    if (raw.toLowerCase().startsWith("search://")) {
      const query = raw.slice("search://".length).trim();
      if (query.length < 2) {
        setToolbarError("Type at least two characters to search.");
        return;
      }
      if (entry.kind === "search" && entry.query === query) {
        setToolbarError("");
        return;
      }
      setToolbarError("");
      runSearch(query);
      return;
    }

    const next = normalizeAddress(raw);
    if (!isValidAddress(next)) {
      setToolbarError("Addresses look like tidepool.zz.");
      return;
    }

    setToolbarError("");
    navigateTo(next, "typed");
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();

    if (query.length < 2) {
      setToolbarError("Type at least two characters to search.");
      return;
    }
    if (entry.kind === "search" && entry.query === query) {
      setToolbarError("");
      return;
    }

    setToolbarError("");
    runSearch(query);
  }

  return (
    <div className="browser">
      <Toolbar
        address={address}
        onAddressChange={setAddress}
        onSubmitAddress={handleAddressSubmit}
        canBack={canGoBack(nav)}
        canForward={canGoForward(nav)}
        onBack={goBack}
        onForward={goForward}
        users={users}
        currentUser={currentUser}
        onUserChange={handleUserChange}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearchSubmit}
        onOpenHistory={openHistory}
        onOpenPublish={openPublish}
        error={toolbarError}
      />

      <main className="content">
        {entry.kind === "site" &&
        site &&
        !loading &&
        !notFound &&
        !pageError ? (
          <SiteFrame
            frameRef={siteFrameRef}
            address={entry.address}
            html={site.html}
            scrollY={entry.scrollY}
            onNavigate={openLink}
          />
        ) : (
          <div className="page-scroll" ref={pageScrollRef}>
            {entry.kind === "home" ? (
              <HomeView
                sites={directory}
                loading={directoryLoading}
                error={bootError}
                onOpen={(target) => navigateTo(target, "link")}
              />
            ) : loading ? (
              <div className="page centered">
                <p className="muted">
                  Loading {entry.kind === "site" ? entry.address : "results"}...
                </p>
              </div>
            ) : pageError ? (
              <div className="page centered">
                <p className="kicker">Error</p>
                <h1>The small web did not answer.</h1>
                <p className="muted">{pageError}</p>
                <button type="button" className="button" onClick={retry}>
                  Try again
                </button>
              </div>
            ) : notFound && entry.kind === "site" ? (
              <NotFoundView address={entry.address} />
            ) : entry.kind === "search" ? (
              <SearchView
                query={entry.query}
                results={searchResults}
                onOpen={(target) => navigateTo(target, "search")}
              />
            ) : null}
          </div>
        )}
      </main>

      <HistoryPanel
        open={historyOpen}
        user={currentUser}
        onClose={closeHistory}
        onSelect={jumpToHistory}
      />
      <PublishPanel
        open={publishOpen}
        users={users}
        currentUser={currentUser}
        onClose={closePublish}
        onPublished={handlePublished}
      />
    </div>
  );
}
