import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root")); // found in index.html; it's a div container
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);