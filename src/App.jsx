import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { FooterComp, NavComp } from "./components";
import { ClientComp, Main, Publish, Vault } from "./pages";
import { createAppTheme } from "./components/theme";

function App() {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("themeMode");
    return storedMode || "dark"; 
  });

  useEffect(() => {
    // Update localStorage when mode changes
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
          <Route path="/publish" element={<Publish />} />
          <Route path="/vault" element={<Vault />} />
           <Route path="/client" element={<ClientComp />} />
        </Routes>
        <FooterComp />
      </Router>
    </ThemeProvider>
  );
}

export default App;
