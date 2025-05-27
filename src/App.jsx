import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { FooterComp, NavComp } from "./components";
import {
  AuthenticateEntity,
  CreateEntity,
  Main,
  PublishContent,
  ReliabilityTest,
  StoreToken,
  Telemetry,
} from "./pages";
import { createAppTheme } from "./components/theme";

function App() {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("themeMode");
    return storedMode || "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavComp toggleMode={toggleMode} mode={mode} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/publish-content" element={<PublishContent />} />
          <Route path="/create-entity" element={<CreateEntity />} />
          <Route path="/authenticate-entity" element={<AuthenticateEntity />} />
          <Route path="/store-token" element={<StoreToken />} />
          <Route path="/reliability-test" element={<ReliabilityTest />} />
          <Route path="/telemetry-docs" element={<Telemetry />} />
        </Routes>
        <FooterComp />
      </Router>
    </ThemeProvider>
  );
}

export default App;
