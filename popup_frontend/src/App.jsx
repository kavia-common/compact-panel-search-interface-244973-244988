import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Controls from "./components/Controls";
import ResultsList from "./components/ResultsList";
import SettingsLink from "./components/SettingsLink";
import * as chromeMessage from "./chromeMessage";

// PUBLIC_INTERFACE
function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Request search from background via Chrome runtime messaging (MV3-safe)
  const handleSearch = (searchQuery) => {
    setLoading(true);
    setError(null);
    if (!searchQuery.trim()) {
      setLoading(false);
      setResults([]);
      return;
    }
    chromeMessage
      .sendMessage({ type: "SEARCH", payload: { query: searchQuery } })
      .then((response) => {
        setLoading(false);
        if (!response || response.error) {
          setError(response?.error || "Background unavailable");
          setResults([]);
        } else {
          setResults(response.results || []);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Error: Could not connect to extension background script.");
        setResults([]);
      });
  };

  // Optionally, handle indexing trigger
  const handleIndex = () => {
    chromeMessage.sendMessage({ type: "INDEX" }).then((resp) => {
      // Optionally show feedback in UI later
      // e.g. setError(resp && resp.error ? resp.error : null)
    });
  };

  return (
    <div className="retro-popup">
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => handleSearch(query)}
        loading={loading}
      />
      <Controls onIndex={handleIndex} />
      <ResultsList results={results} loading={loading} error={error} />
      <SettingsLink />
    </div>
  );
}

export default App;
