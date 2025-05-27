import React, { useState } from "react";
import { Box, Typography, IconButton, Drawer, Grid } from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import { CloseCircleOutlined } from "@ant-design/icons";
import ExternalPlatforms from "../Documentation/platforms/index.mdx";
import ExternalBridge from "../Documentation/platforms/bridgePlatforms.mdx";
import Client from "../Documentation/client/index.mdx";
import GatewayClient from "../Documentation/gatewayClient/index.mdx";
import GatewayServer from "../Documentation/gatewayServer/index.mdx";
import Publisher from "../Documentation/publisher/index.mdx";
import BridgeServer from "../Documentation/bridgeServer/index.mdx";
import Vault from "../Documentation/vault/index.mdx";

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

const StoreToken = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const handleCloseDrawer = () => {
    setSelectedNode(null);
  };

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
          Store Token
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
          mb: { xs: 6, md: 15, sm: 10, lg: 25 },
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Box sx={{ height: 300, borderRadius: 2, border: "1px solid #ccc" }}>
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
    </Box>
  );
};

export default StoreToken;
