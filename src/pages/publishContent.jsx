import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";
import {
  CloseCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Client from "../documentations/client/index.mdx";
import GatewayClient from "../documentations/gatewayClient/index.mdx";
import GatewayServer from "../documentations/gatewayServer/index.mdx";
import Publisher from "../documentations/publisher/index.mdx";
import BridgeServer from "../documentations/bridgeServer/index.mdx";
import Vault from "../documentations/vault/index.mdx";
import ExternalPlatforms from "../documentations/platforms/index.mdx";
import ExternalBridge from "../documentations/emailBridge/index.mdx";
import Overview from "./overview";

const nodeDescriptions = {
  Client: { title: "Clients (Apps)", content: <Client /> },
  GatewayClient: { title: "Gateway Client", content: <GatewayClient /> },
  GatewayServer: { title: "Gateway Server", content: <GatewayServer /> },
  Publisher: { title: "Publisher", content: <Publisher /> },
  BridgeServer: { title: "Bridge Server", content: <BridgeServer /> },
  Vault: { title: "Vault", content: <Vault /> },
  ExternalPlatforms: {
    title: "External Platforms",
    content: <ExternalPlatforms />,
  },
  ExternalBridges: { title: "External Bridges", content: <ExternalBridge /> },
};
const PublishContent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState("");

  const handleDrawerOpen = (key) => {
    const node = nodeDescriptions[key];
    if (node) {
      setDrawerContent(node.content);
      setDrawerTitle(node.title);
      setDrawerOpen(true);
    }
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
          pt: { xs: 15, sm: 20, md: 15 },
          textAlign: "center",
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          fontSize={{ xs: "3rem", sm: "4rem", md: "6rem" }}
        >
          Publish Content
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }}>
          This method handles publishing a relaysms payload.
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          mb: { xs: 6, md: 15 },
        }}
      >
        <Overview handleDrawerOpen={handleDrawerOpen} />
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
            <CloseCircleOutlined style={{ fontSize: 24 }} />
          </IconButton>
        </Box>
        <Box mt={2}>{drawerContent}</Box>
      </Drawer>
    </Box>
  );
};

export default PublishContent;
