import React from "react";

// PUBLIC_INTERFACE
function Controls({ onIndex }) {
  return (
    <div className="controls-bar">
      <button className="retro-btn-secondary" onClick={onIndex}>
        Index
      </button>
      {/* Add more controls inline here as needed */}
    </div>
  );
}

export default Controls;
