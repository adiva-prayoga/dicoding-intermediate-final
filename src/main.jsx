import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/style.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { LocaleProvider } from "./contexts/LocaleContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LocaleProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LocaleProvider>
    </AuthProvider>
  </React.StrictMode>
);
