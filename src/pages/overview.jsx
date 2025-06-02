import ReactFlow, { Handle } from "reactflow";
import { Box, Typography, Alert } from "@mui/material";

const nodes = [
  {
    id: "ClientApp",
    type: "input",
    data: { label: "Client (Apps)" },
    position: { x: 0, y: 180 },
    sourcePosition: "right",
    style: { width: 120, background: "#e3f2fd" },
  },
  {
    id: "GatewayClient",
    data: { label: "Gateway Client" },
    position: { x: 240, y: 180 },
    targetPosition: "left",
    sourcePosition: "right",
    style: { width: 120, background: "#fffde7" },
  },
  {
    id: "GatewayServer",
    data: { label: "Gateway Server" },
    position: { x: 500, y: 180 },
    targetPosition: "left",
    sourcePosition: "right",
    style: { width: 120, background: "#fffde7" },
  },
  {
    id: "Publisher",
    data: { label: "Publisher" },
    position: { x: 540, y: 80 },
    targetPosition: "left",
    sourcePosition: "right",
    style: { width: 120, background: "#e8f5e9" },
  },
  {
    id: "BridgeServer",
    data: { label: "Bridge Server" },
    position: { x: 540, y: 280 },
    targetPosition: "left",
    sourcePosition: "right",
    style: { width: 120, background: "#e8f5e9" },
  },
  {
    id: "Vault",
    data: { label: "Vault" },
    position: { x: 720, y: 180 },
    targetPosition: "left",
    sourcePosition: "right",
    style: { width: 120, background: "#f3e5f5" },
  },
  {
    id: "Gmail",
    data: { label: "Gmail" },
    position: { x: 940, y: 40 },
    targetPosition: "left",
    style: { width: 120, background: "#fce4ec" },
  },
  {
    id: "Twitter",
    data: { label: "Twitter" },
    position: { x: 940, y: 100 },
    targetPosition: "left",
    style: { width: 120, background: "#e1f5fe" },
  },
  {
    id: "Telegram",
    data: { label: "Telegram" },
    position: { x: 940, y: 160 },
    targetPosition: "left",
    style: { width: 120, background: "#e0f2f1" },
  },
  {
    id: "EmailBridge",
    data: { label: "Email Bridge" },
    position: { x: 940, y: 280 },
    targetPosition: "left",
    style: { width: 120, background: "#fff3e0" },
  },
];

const edges = [
  {
    id: "e1",
    source: "ClientApp",
    target: "GatewayClient",
    label: "Encrypted SMS",
    type: "straight",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e2",
    source: "GatewayClient",
    target: "GatewayServer",
    label: "HTTPS / SMTP / FTP",
    type: "straight",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e3",
    source: "GatewayServer",
    target: "Publisher",
    label: "Platform Payload",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e4",
    source: "GatewayServer",
    target: "BridgeServer",
    label: "Bridge Payload",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e5",
    source: "Publisher",
    target: "Vault",
    label: "Decrypt & Auth",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e6",
    source: "BridgeServer",
    target: "Vault",
    label: "Decrypt & Auth",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e9",
    source: "Publisher",
    target: "Gmail",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e10",
    source: "Publisher",
    target: "Twitter",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e11",
    source: "Publisher",
    target: "Telegram",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e12",
    source: "BridgeServer",
    target: "EmailBridge",
    type: "straight",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
];

const nodeClickMap = {
  ClientApp: "Client",
  GatewayClient: "GatewayClient",
  GatewayServer: "GatewayServer",
  Publisher: "Publisher",
  BridgeServer: "BridgeServer",
  Vault: "Vault",
};

const Overview = ({ handleDrawerOpen }) => (
  <Box sx={{ height: 540 }}>
    <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
      System Architecture Overview
    </Typography>
    <Typography variant="body2" sx={{ mb: 2 }}>
      The diagram below illustrates the flow of messages and data between the
      main components of the RelaySMS, from client apps through gateways,
      servers, and external services.
    </Typography>
    <Alert severity="info">
      Tip: Click on a node in the diagram to view more information about that
      component.
    </Alert>
    <Box sx={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        panOnScroll={false}
        onNodeClick={(_, node) => {
          if (handleDrawerOpen && nodeClickMap[node.id]) {
            handleDrawerOpen(nodeClickMap[node.id]);
          }
        }}
      />
    </Box>
  </Box>
);

export default Overview;
