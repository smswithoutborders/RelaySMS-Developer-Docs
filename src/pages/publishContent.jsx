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
import ExternalBridge from "../dataFlow/publishContent/bridgePlatforms.mdx"
import Client from "../dataFlow/publishContent/client.mdx";
import GatewayClient from "../dataFlow/publishContent/gatewayClient.mdx";
import GatewayServer from "../dataFlow/publishContent/gatewayServer.mdx";
import Publisher from "../dataFlow/publishContent/publisher.mdx";
import BridgeServer from "../dataFlow/publishContent/bridgeServer.mdx";
import Vault from "../dataFlow/publishContent/vault.mdx";

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

const nodes = [
  {
    id: "1",
    position: { x: 0, y: 100 },
    data: { label: "Client (Apps)" },
    type: "client",
  },
  {
    id: "2",
    position: { x: 200, y: 100 },
    data: { label: "Gateway Client" },
    type: "gatewayClient",
  },
  {
    id: "3",
    position: { x: 400, y: 100 },
    data: { label: "Gateway Server" },
    type: "gatewayServer",
  },
  {
    id: "4",
    position: { x: 600, y: 50 },
    data: { label: "Publisher" },
    type: "publisher",
  },
  {
    id: "5",
    position: { x: 600, y: 150 },
    data: { label: "Bridge Server" },
    type: "bridgeServer",
  },
  {
    id: "6",
    position: { x: 800, y: 100 },
    data: { label: "Vault" },
    type: "vault",
  },
  {
    id: "7",
    position: { x: 1000, y: 50 },
    data: { label: "External Platforms\n(Gmail etc.)" },
    type: "externalPlatforms",
  },
  {
    id: "8",
    position: { x: 1000, y: 150 },
    data: { label: "External Bridges\n(Email Aliases etc.)" },
    type: "externalBridges",
  },
];

const edges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e3-5", source: "3", target: "5", animated: true },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    animated: true,
    label: "Verify Token",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
    label: "Verify Token",
  },
  { id: "e4-7", source: "4", target: "7", animated: true },
  { id: "e5-8", source: "5", target: "8", animated: true },
];

const PublishContent = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
  };

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
        <Box sx={{ height: 300, borderRadius: 2 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={handleNodeClick}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnDrag={false}
            panOnScroll={false}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          my: 3,
          mb: 10
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
            fontSize: "1rem",
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
            fontSize: "1rem",
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
