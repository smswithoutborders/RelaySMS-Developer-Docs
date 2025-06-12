import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Grid,
  Button,
} from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import {
  CloseCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ExternalPlatforms from "../dataFlow/publishContent/platforms.mdx";
import ExternalBridge from "../dataFlow/publishContent/bridgePlatforms.mdx";
import Client from "../dataFlow/publishContent/client.mdx";
import GatewayClient from "../dataFlow/publishContent/gatewayClient.mdx";
import GatewayServer from "../dataFlow/publishContent/gatewayServer.mdx";
import Publisher from "../dataFlow/publishContent/publisher.mdx";
import BridgeServer from "../dataFlow/publishContent/bridgeServer.mdx";
import Vault from "../dataFlow/publishContent/vault.mdx";
import Overview from "./overview";

const nodeDescriptions = {
  client: {
    title: "Clients (Apps)",
    content: <Client />,
  },
  gatewayClient: {
    title: "Gateway Client",
    content: <GatewayClient />,
  },
  gatewayServer: {
    title: "Gateway Server",
    content: <GatewayServer />,
  },
  Publisher: {
    title: "Publisher",
    content: <Publisher />,
  },
  bridgeServer: {
    title: "Bridge Server",
    content: <BridgeServer />,
  },
  vault: {
    title: "Vault",
    content: <Vault />,
  },
  externalPlatforms: {
    title: "External Platforms",
    content: <ExternalPlatforms />,
  },
  externalBridges: {
    title: "External Bridges",
    content: <ExternalBridge />,
  },
};

const PublishContent = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleCloseDrawer = () => {
    setSelectedNode(null);
  };

  const content = `{
  "content": "encoded_relay_sms_payload",
  "metadata": {
    "From": "+1234567890"
  }
}`;

  return (
    <Box>
      <Box
        sx={{
          pt: { xs: 15, sm: 20, md: 15 },
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
          Publish Content
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }} wrap>
          This method handles publishing a relaysms payload.
        </Typography>
      </Box>
      {/*  */}

      <Box
        sx={{
          pt: { xs: 2, sm: 2, md: 2 },
          my: "auto",
          alignContent: "center",
          textAlign: "center",
          mb: { xs: 6, md: 15, sm: 10, lg: 8 },
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Box>
          <Overview />
        </Box>
      </Box>
      <Box
        sx={{
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          my: 3,
          mb: 10,
        }}
      >
        <Typography variant="h6">Sample payload.json</Typography>
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {content}
        </pre>
      </Box>
      <Drawer
        anchor="right"
        open={!!selectedNode}
        onClose={handleCloseDrawer}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400, lg: 600 }, p: 3 } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {selectedNode && (
            <Box>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid size={10}>
                  <Typography variant="h5" fontWeight="bold">
                    {nodeDescriptions[selectedNode.type]?.title}
                  </Typography>
                </Grid>
                <Grid size={2} justifyContent="flex-end" alignItems="end">
                  <IconButton onClick={handleCloseDrawer}>
                    <CloseCircleOutlined />
                  </IconButton>
                </Grid>
              </Grid>
              <Box mt={2}>{nodeDescriptions[selectedNode.type]?.content}</Box>
            </Box>
          )}
        </Box>
      </Drawer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          my: 5,
        }}
      >
        <Button
          variant="text"
          component="a"
          href="/store-token"
          startIcon={<LeftOutlined />}
          sx={{
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: { md: "1rem", xs: "0.8rem" },
            color: "primary.main",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          Back to Store Token
        </Button>
        <Button
          variant="text"
          component="a"
          href="/telemetry-docs"
          endIcon={<RightOutlined />}
          sx={{
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: { md: "1rem", xs: "0.8rem" },
            color: "primary.main",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          Continue to Telemetry
        </Button>
      </Box>
    </Box>
  );
};

export default PublishContent;
