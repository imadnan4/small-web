import type { SiteSummary } from "@/lib/types";

type Props = {
  sites: SiteSummary[];
  loading: boolean;
  error: string;
  onOpen: (address: string) => void;
};

export default function HomeView({ sites, loading, error, onOpen }: Props) {
  return (
    <div className="page">
      <p className="kicker">The small web</p>
      <h1>Pick an address, or type one above.</h1>
      <p className="lead">
        The pages live in MongoDB. Anyone can add another. Links inside them work
        like links should, and some of them point nowhere on purpose.
      </p>

      {error ? <p className="notice error">{error}</p> : null}
      {loading ? <p className="muted">Loading the directory...</p> : null}

      {!loading && sites.length > 0 ? (
        <ul className="site-list">
          {sites.map((site) => (
            <li key={site.address}>
              <button className="site-row" onClick={() => onOpen(site.address)}>
                <span className="site-row-main">
                  <span className="site-title">{site.title}</span>
                  <span className="site-address">{site.address}</span>
                </span>
                <span className="site-author">{site.author}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {!loading && !error && sites.length === 0 ? (
        <p className="notice">
          The web is empty. Run <code>npm run seed</code>, then reload.
        </p>
      ) : null}
    </div>
  );
}
