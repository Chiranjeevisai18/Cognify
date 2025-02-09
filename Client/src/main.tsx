import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './index.css'; // ✅ Import Tailwind styles directly

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* ✅ BrowserRouter is only here */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
