import React from "react";
import { Box, Grid, Typography, IconButton, Drawer } from "@mui/material";
import { ButtonContained, ButtonOutline } from "../components";
import Client from "../Documentation/client/index.mdx";
import GatewayClient from "../Documentation/gatewayClient/index.mdx";
import GatewayServer from "../Documentation/gatewayServer/index.mdx";
import Publisher from "../Documentation/publisher/index.mdx";
import BridgeServer from "../Documentation/bridgeServer/index.mdx";
import Vault from "../Documentation/vault/index.mdx";

const Main = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerContent, setDrawerContent] = React.useState(null);

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
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setDrawerContent(null);
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
            fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
          }}
          className="header"
        >
          RelaySMS System <br />
          Atlas
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }} wrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Box>
      {/*  */}
      <Box
        sx={{
          pt: { xs: 2, sm: 2, md: 2 },
          my: "auto",
          alignContent: "center",
          textAlign: "center",
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonContained
              text="Client"
              onClick={() => handleDrawerOpen("Client")}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonContained
              text="Vault"
              onClick={() => handleDrawerOpen("Vault")}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonContained
              text="Publisher"
              onClick={() => handleDrawerOpen("Publisher")}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonContained
              text="Gateway Client"
              onClick={() => handleDrawerOpen("Gateway Client")}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonContained
              text="Gateway Server"
              onClick={() => handleDrawerOpen("Gateway Server")}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonContained
              text="Bridge Server"
              onClick={() => handleDrawerOpen("Bridge Server")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          pt: { xs: 4, sm: 6, md: 30 },
          my: "auto",
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
          RelaySMS Architecture
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }} wrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            Documentation
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
