import React from "react";

// PUBLIC_INTERFACE
function SearchBar({ query, setQuery, onSearch, loading }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="search-bar">
      <input
        className="retro-input"
        type="text"
        placeholder="Type your search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        aria-label="Search"
      />
      <button
        className="retro-btn"
        onClick={onSearch}
        disabled={loading || !query.trim()}
        aria-label="Search"
      >
        {loading ? "⌛" : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
