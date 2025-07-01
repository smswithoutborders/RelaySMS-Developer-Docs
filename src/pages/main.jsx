import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Drawer,
  Alert,
} from "@mui/material";
import { ButtonContained, ButtonOutline } from "../components";
import Client from "../documentations/client/index.mdx";
import GatewayClient from "../documentations/gatewayClient/index.mdx";
import GatewayServer from "../documentations/gatewayServer/index.mdx";
import Publisher from "../documentations/publisher/index.mdx";
import BridgeServer from "../documentations/bridgeServer/index.mdx";
import Vault from "../documentations/vault/index.mdx";
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
          pt: { xs: 15, sm: 20, md: 20 },
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
            mb: 5,
          }}
          className="header"
        >
          RelaySMS Developer <br />
          Documentation
        </Typography>

        <hr />

        <Box sx={{ pt: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
            System Architecture Overview
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            The diagram below illustrates the flow of messages and data between
            the main components of the RelaySMS, from client apps through
            gateways, servers, and external services.
          </Typography>
          <Alert severity="info">
            Tip: Click on a node in the diagram to view more information about
            that component.
          </Alert>
          <Overview handleDrawerOpen={handleDrawerOpen} />
        </Box>
      </Box>
      <Box
        id="instances"
        sx={{
          pt: { xs: 4, sm: 6, md: 30 },
          my: 2,
          alignContent: "center",
          textAlign: "center",
          mb: { xs: 6, md: 15, sm: 10, lg: 25 },
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
          className="header"
        >
          Data Flow Guides
        </Typography>
        <Typography variant="body1" sx={{ py: { md: 8, xs: 4 } }} wrap>
          These guides will help you understand how to use the RelaySMS system
          effectively. Each guide provides step-by-step instructions and code{" "}
          <br />
          examples to help you get started quickly.
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline linkTo="/create-entity" text="Create Entity" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline
              linkTo="/authenticate-entity"
              text="Authenticate Entity"
            />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline linkTo="/store-token" text="Store Token" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline linkTo="/publish-content" text="Publish Content" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline linkTo="/telemetry" text="Telemetry" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline linkTo="/reliability-test" text="Reliability Test" />
          </Grid>
        </Grid>
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
