import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer />
      <Router />
    </AuthProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
