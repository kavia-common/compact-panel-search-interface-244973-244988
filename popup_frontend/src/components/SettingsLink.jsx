import React from "react";

// PUBLIC_INTERFACE
function SettingsLink() {
  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) chrome.runtime.openOptionsPage();
    else window.open("options.html");
  };

  return (
    <div className="settings-link">
      <button className="retro-btn-link" onClick={openOptions}>
        Settings / Options
      </button>
    </div>
  );
}

export default SettingsLink;
