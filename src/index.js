import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./routes";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./providers";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <Router>
      <Routes />
    </Router>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
