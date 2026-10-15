import { StrictMode } from "react";
import App from "./App.jsx";
import ClientAnalytics from "./ClientAnalytics.jsx";

export default function AppRoot() {
  return (
    <StrictMode>
      <App />
      <ClientAnalytics />
    </StrictMode>
  );
}
