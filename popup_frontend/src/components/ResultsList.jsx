import React from "react";

// PUBLIC_INTERFACE
function ResultsList({ results, loading, error }) {
  if (loading) return <div className="results-info">Searching...</div>;
  if (error) return <div className="results-error">{error}</div>;

  if (!results || results.length === 0) {
    return <div className="results-info">No results found.</div>;
  }

  return (
    <ul className="results-list">
      {results.map((res, idx) => (
        <li className="result-item" key={res.id || idx}>
          {res.title ? <strong>{res.title}</strong> : null}
          <div className="result-body">{res.snippet || String(res.content || res.text || "")}</div>
        </li>
      ))}
    </ul>
  );
}

export default ResultsList;
