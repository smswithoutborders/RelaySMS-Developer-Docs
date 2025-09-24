import ReactFlow from "reactflow";
import { Box } from "@mui/material";

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
    id: "Platforms",
    data: { label: "Platforms" },
    position: { x: 940, y: 80 },
    targetPosition: "left",
    sourcePosition: "right",
    style: { width: 120, background: "#e3f2fd" },
  },
  {
    id: "EmailBridge",
    data: { label: "Email Bridge" },
    position: { x: 940, y: 280 },
    targetPosition: "left",
    sourcePosition: "right",
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
    id: "e7",
    source: "Publisher",
    target: "Platforms",
    label: "Content",
    type: "straight",
    animated: true,
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
  },
  {
    id: "e8",
    source: "BridgeServer",
    target: "EmailBridge",
    label: "Content",
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
  Platforms: "Platforms",
  EmailBridge: "EmailBridge",
};

const Overview = ({ handleDrawerOpen }) => (
  <Box
    sx={{
      width: "100%",
      maxWidth: "100vw",
      overflowX: "auto",
      pb: 2,
      my: 5,
    }}
  >
    <Box
      sx={{
        width: { xs: "900px", sm: "100%", md: "100%" },
        minWidth: { xs: "900px", sm: "100%", md: "100%" },
        height: { xs: 400, sm: 500, md: 500 },
        mt: 2,
      }}
    >
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
