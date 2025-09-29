import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // default export from App.jsx
import "./index.css"; // optional, your global CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
