import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';  // Ensure this line is in index.js


const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);