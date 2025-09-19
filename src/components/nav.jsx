import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  GithubOutlined,
  MenuFoldOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const NavComp = ({ toggleMode, mode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundColor =
    scrolled || mode !== "light" ? "background.default" : "transparent";

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        transition: "background-color 0.3s ease",
        bgcolor: backgroundColor,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        p: { xs: 1.5, sm: 3, md: 3 },
      }}
    >
      <Box
        maxWidth="1600px"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link to="/">
          <Box
            component="img"
            src={mode === "light" ? "/logo-light.png" : "/logo-dark.png"}
            alt="Logo"
            sx={{ height: 40, mr: 1 }}
          />
        </Link>

        {/* Mobile menu */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton onClick={handleMenuOpen} sx={{ mr: 1 }}>
            <MenuFoldOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem
              onClick={() => {
                toggleMode();
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                {mode === "light" ? <MoonOutlined /> : <SunOutlined />}
              </ListItemIcon>
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </MenuItem>
            <MenuItem
              component="a"
              href="https://github.com/smswithoutborders/RelaySMS-System-Atlas"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMenuClose}
            >
              <ListItemIcon>
                <GithubOutlined
                  style={{
                    fontSize: 22,
                    color: mode === "light" ? "black" : "inherit",
                  }}
                />
              </ListItemIcon>
              GitHub
            </MenuItem>
          </Menu>
        </Box>

        {/* Desktop right-side icons */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <a
            href="https://github.com/smswithoutborders/RelaySMS-System-Atlas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined
              style={{
                fontSize: 24,
                color: mode === "light" ? "black" : "white",
              }}
            />
          </a>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === "light" ? <MoonOutlined /> : <SunOutlined />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NavComp;
