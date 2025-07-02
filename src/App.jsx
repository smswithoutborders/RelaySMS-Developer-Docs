import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { FooterComp, NavComp } from "./components";
import {
  AuthenticateEntity,
  Contribution,
  CreateEntity,
  Main,
  PublishContent,
  ReliabilityTest,
  StoreToken,
  Telemetry,
} from "./pages";
import { createAppTheme } from "./components/theme";

function AppRoutes({ toggleMode, mode }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <NavComp toggleMode={toggleMode} mode={mode} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/publish-content" element={<PublishContent />} />
        <Route path="/create-entity" element={<CreateEntity />} />
        <Route path="/authenticate-entity" element={<AuthenticateEntity />} />
        <Route path="/store-token" element={<StoreToken />} />
        <Route path="/reliability-test" element={<ReliabilityTest />} />
        <Route path="/telemetry" element={<Telemetry />} />
        <Route path="/contribution" element={<Contribution />} />
      </Routes>
      <FooterComp />
    </>
  );
}

function App() {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("themeMode");
    return storedMode || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes toggleMode={toggleMode} mode={mode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
