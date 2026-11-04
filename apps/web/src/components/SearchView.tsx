import type { SearchResult } from "@/lib/types";

type Props = {
  query: string;
  results: SearchResult[];
  onOpen: (address: string) => void;
};

export default function SearchView({ query, results, onOpen }: Props) {
  return (
    <div className="page">
      <p className="kicker">Search</p>
      <h1>Results for &ldquo;{query}&rdquo;</h1>
      <p className="lead">
        {results.length === 0
          ? "No page contains that. Try a broader word."
          : `${results.length} page${results.length === 1 ? "" : "s"} contain those words.`}
      </p>

      <ul className="search-list">
        {results.map((result) => (
          <li key={result.address}>
            <button className="search-result" onClick={() => onOpen(result.address)}>
              <span className="search-address">{result.address}</span>
              <span className="search-title">{result.title}</span>
              <span className="search-snippet">{result.snippet}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
