import React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { GithubOutlined } from "@ant-design/icons";
import { MoonOutlined, SunOutlined } from "@ant-design/icons/lib";
import { Link } from "react-router-dom";

const NavComp = ({ toggleMode, mode }) => {
  return (
    <Box
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

      <Box sx={{ display: "flex", gap: 4 }}>
        <Typography component={Link}  sx={{ textDecoration: "none", color: "inherit" }} to="/" variant="subtitle1"> Atlas </Typography>
        <Typography component={Link}  sx={{ textDecoration: "none", color: "inherit" }} to="/" variant="subtitle1"> Instances </Typography>
        <Typography component={Link}  sx={{ textDecoration: "none", color: "inherit" }} to="/" variant="subtitle1"> Contributing </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <a
          href="https://github.com/smswithoutborders/RelaySMS-System-Atlas"
          target="_blank"
        >
          {" "}
          <GithubOutlined style={{ fontSize: 24, color: mode === "light" ? "black" : "white" }} />{" "}
        </a>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === "light" ? <MoonOutlined /> : <SunOutlined />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavComp;
