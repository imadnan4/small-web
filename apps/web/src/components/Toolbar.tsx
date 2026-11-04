import type { FormEvent } from "react";
import type { User } from "@/lib/types";

type Props = {
  address: string;
  onAddressChange: (value: string) => void;
  onSubmitAddress: (event: FormEvent<HTMLFormElement>) => void;
  canBack: boolean;
  canForward: boolean;
  onBack: () => void;
  onForward: () => void;
  users: User[];
  currentUser: string;
  onUserChange: (name: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onOpenHistory: () => void;
  onOpenPublish: () => void;
  error: string;
};

export default function Toolbar({
  address,
  onAddressChange,
  onSubmitAddress,
  canBack,
  canForward,
  onBack,
  onForward,
  users,
  currentUser,
  onUserChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onOpenHistory,
  onOpenPublish,
  error,
}: Props) {
  return (
    <header className="toolbar">
      <div className="nav-buttons">
        <button
          type="button"
          className="nav-button"
          onClick={onBack}
          disabled={!canBack}
          aria-label="Back"
          title="Back"
        >
          ←
        </button>
        <button
          type="button"
          className="nav-button"
          onClick={onForward}
          disabled={!canForward}
          aria-label="Forward"
          title="Forward"
        >
          →
        </button>
      </div>

      <form className="address-form" onSubmit={onSubmitAddress}>
        <input
          className="address-input"
          value={address}
          onChange={(event) => onAddressChange(event.target.value)}
          placeholder="tidepool.zz"
          aria-label="Address"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="button">
          Go
        </button>
      </form>

      <form className="search-form" onSubmit={onSearch}>
        <input
          className="search-input"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Search the small web"
          aria-label="Search the small web"
          autoComplete="off"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="toolbar-actions">
        <label className="user-picker">
          <span>Browsing as</span>
          <select
            value={currentUser}
            onChange={(event) => onUserChange(event.target.value)}
            disabled={users.length === 0}
          >
            {users.length === 0 ? <option value="">Loading...</option> : null}
            {users.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="button quiet" onClick={onOpenHistory}>
          History
        </button>
        <button type="button" className="button quiet" onClick={onOpenPublish}>
          Publish
        </button>
      </div>

      {error ? <p className="toolbar-error">{error}</p> : null}
    </header>
  );
}
