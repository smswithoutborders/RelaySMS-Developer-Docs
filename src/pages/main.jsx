import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Drawer,
  Alert,
} from "@mui/material";
import Client from "../documentations/client/index.mdx";
import GatewayClient from "../documentations/gatewayClient/index.mdx";
import GatewayServer from "../documentations/gatewayServer/index.mdx";
import Publisher from "../documentations/publisher/index.mdx";
import BridgeServer from "../documentations/bridgeServer/index.mdx";
import Vault from "../documentations/vault/index.mdx";
import Platforms from "../documentations/platforms/index.mdx";
import EmailBridge from "../documentations/emailBridge/index.mdx";
import Overview from "./overview";

const Main = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerContent, setDrawerContent] = React.useState(null);
  const [drawerTitle, setDrawerTitle] = React.useState("");

  const mdxComponents = {
    Client: <Client />,
    Vault: <Vault />,
    Publisher: <Publisher />,
    GatewayClient: <GatewayClient />,
    GatewayServer: <GatewayServer />,
    BridgeServer: <BridgeServer />,
    Platforms: <Platforms />,
    EmailBridge: <EmailBridge />,
  };

  const handleDrawerOpen = (key) => {
    setDrawerContent(mdxComponents[key]);
    setDrawerTitle(key);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setDrawerContent(null);
    setDrawerTitle("");
  };

  return (
    <Box>
      <Box
        sx={{
          pt: { xs: 15, sm: 20, md: 25 },
          my: "auto",
          alignContent: "center",
          textAlign: "center",

          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", sm: "4rem", md: "6rem" },
            mb: 10,
          }}
          className="header"
        >
          RelaySMS System <br />
          Architecture Overview
        </Typography>

        <hr />

        <Box sx={{ pt: 4 }}>
          <Typography variant="body1" sx={{ mb: 2, fontSize: "1.2rem", mx: {md: 6, xs: 2} }}>
            The diagram below illustrates the flow of messages and data between
            the main components of the RelaySMS, from client apps through
            gateways, servers, and external services.
          </Typography>
          <Overview handleDrawerOpen={handleDrawerOpen} />
          <Alert severity="info">
            Tip: Click on a node in the diagram to view more information about
            that component.
          </Alert>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400, lg: 600 }, p: 3 } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            {drawerTitle || "Details"}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <span style={{ fontSize: 24 }}>&times;</span>
          </IconButton>
        </Box>
        <Box mt={2}>{drawerContent}</Box>
      </Drawer>
    </Box>
  );
};

export default Main;
