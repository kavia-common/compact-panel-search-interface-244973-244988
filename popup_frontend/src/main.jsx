import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";

// PUBLIC_INTERFACE
// Entrypoint: Render App into #app for the Chrome popup panel.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
