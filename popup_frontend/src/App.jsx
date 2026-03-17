import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Controls from "./components/Controls";
import ResultsList from "./components/ResultsList";
import SettingsLink from "./components/SettingsLink";

// PUBLIC_INTERFACE
function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Request search from background via Chrome runtime messaging
  const handleSearch = (searchQuery) => {
    setLoading(true);
    setError(null);

    // Only proceed if query is not empty
    if (!searchQuery.trim()) {
      setLoading(false);
      setResults([]);
      return;
    }

    // MV3 Messaging: request search
    chrome.runtime.sendMessage(
      {
        type: "SEARCH",
        payload: { query: searchQuery },
      },
      (response) => {
        setLoading(false);
        if (chrome.runtime.lastError) {
          setError("Error: Could not connect to extension background script.");
          setResults([]);
        } else if (response?.error) {
          setError(response.error);
          setResults([]);
        } else {
          setResults(response?.results || []);
        }
      }
    );
  };

  // Optionally, handle indexing trigger
  const handleIndex = () => {
    chrome.runtime.sendMessage({ type: "INDEX" }, (response) => {
      // Show some brief feedback
      // You might want to surface response messages
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
