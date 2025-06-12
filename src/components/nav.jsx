import React from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { GithubOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { MoonOutlined, SunOutlined } from "@ant-design/icons/lib";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Atlas" },
  { to: "/", label: "Instances" },
  { to: "/", label: "Contributing" },
];

const NavComp = ({ toggleMode, mode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      maxWidth="lg"
      mx="auto"
      component="nav"
      sx={{
        p: { xs: 1, sm: 3, md: 4 },
        bgcolor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <Box
          component="img"
          src="/logo.svg"
          alt="Logo"
          sx={{ height: 40, mr: 1 }}
        />
      </Link>

      {/* Desktop links */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 4,
        }}
      >
        {navLinks.map((link) => (
          <Typography
            key={link.label}
            component={Link}
            sx={{ textDecoration: "none", color: "inherit" }}
            to={link.to}
            variant="subtitle1"
          >
            {link.label}
          </Typography>
        ))}
      </Box>

      {/* Mobile menu button */}
      <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
        <IconButton aria-label="menu" onClick={handleMenuOpen} sx={{ mr: 1 }}>
          <MenuFoldOutlined />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {navLinks.map((link) => (
            <MenuItem
              key={link.label}
              component={Link}
              to={link.to}
              onClick={handleMenuClose}
            >
              {link.label}
            </MenuItem>
          ))}
          <Divider />
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
  );
};

export default NavComp;
