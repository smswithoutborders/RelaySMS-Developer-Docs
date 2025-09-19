import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

import { FooterComp, NavComp } from "./components";
import {
  AuthenticateEntity,
  Contribution,
  CreateEntity,
  Main,
  NotFound,
  PublishContent,
  ReliabilityTest,
  StoreToken,
  Telemetry,
} from "./pages";
import { createAppTheme } from "./components/theme";

function AppRoutes({ toggleMode, mode }) {
  const location = useLocation();

  // Smooth scroll to anchor on route change
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
        {/* <Route path="/create-entity" element={<CreateEntity />} />
        <Route path="/authenticate-entity" element={<AuthenticateEntity />} />
        <Route path="/store-token" element={<StoreToken />} />
        <Route path="/reliability-test" element={<ReliabilityTest />} />
        <Route path="/telemetry-docs" element={<Telemetry />} /> */}
        <Route path="/contribution" element={<Contribution />} />
        <Route path="*" element={<NotFound />} />
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
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Grid Background */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: (theme) => `
              linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.3,
            zIndex: -2,
            pointerEvents: "none",
          }}
        />
        
        {/* Additional Accent Lines */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: (theme) => `
              linear-gradient(to right, ${theme.palette.primary.main} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme.palette.primary.main} 1px, transparent 1px)
            `,
            backgroundSize: "200px 200px",
            opacity: 0.1,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />

        <Router>
          <AppRoutes toggleMode={toggleMode} mode={mode} />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
