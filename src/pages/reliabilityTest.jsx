import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import {
  CloseCircleOutlined,
  LeftOutlined,
  CopyOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Publisher from "../dataFlow/telemetry/publisher.mdx";
import Vault from "../dataFlow/telemetry/vault.mdx";
import TelemetryAggregator from "../dataFlow/telemetry/telemetryAggregator.mdx";

const nodeDescriptions = {
  client: {
    title: "Clients (Apps)",
    content: <div> Hey </div>,
  },
  gatewayClient: {
    title: "Gateway Client",
    content: <div> Hey </div>,
  },
  gatewayServer: {
    title: "Gateway Server",
    content: <div> Hey </div>,
  },
  Publisher: {
    title: "Publisher",
    content: <div> Hey </div>,
  },
  bridgeServer: {
    title: "Bridge Server",
    content: <div> Hey </div>,
  },
  vault: {
    title: "Test Platform",
    content: <div> Hey </div>,
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
    data: { label: "Test Platform" },
    type: "test",
  },
];

const edges = [
  { id: "e1-2", label: "payload", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e3-5", source: "3", target: "5", animated: true },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    animated: true,
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
  },
  { id: "e4-7", label: "response", source: "4", target: "7", animated: true },
  { id: "e5-8", source: "5", target: "8", animated: true },
];

const ReliabilityTest = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const handleCloseDrawer = () => {
    setSelectedNode(null);
  };
  const handleCloseDialog = () => setDialogOpen(false);

  const handleEdgeClick = (_, edge) => {
    if (currentStep === 1) {
      if (edge.id === "e1-2") {
        setDialogType("payload");
        setDialogContent(`curl -X POST "https://api.example.com/v3/clients/1234567890/tests" \
-H "Content-Type: application/json"}`);
      } else if (edge.id === "e4-7") {
        setDialogType("response");
        setDialogContent(`{
  "message": "Test started successfully",
  "test_id": 1,
  "test_start_time": 1746799899
}`);
      }
    } else if (currentStep === 2) {
      if (edge.id === "e1-2") {
        setDialogType("payload");
        setDialogContent(`curl -X POST "https://api.example.com/v3/publish" \
-H "Content-Type: application/json" \
-d '{
  "payload": "ENCRYPTED_CONTENT"
}'`);
      } else if (edge.id === "e4-7") {
        setDialogType("response");
        setDialogContent(`{
  "message": "Message published to Reliability Platform",
}`);
      }
    }
    setDialogOpen(true);
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarOpen(true);
  };

  const config = {
    endpoint: "POST /v3/clients/<msisdn>/tests",
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
          Reliability Test
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }} wrap>
          The test is designed to measure how reliable a gateway client is in
          receiving and routing SMS messages accurately and promptly.
        </Typography>
      </Box>
      {/*  */}

      {/* Step 1 */}
      <Box
        sx={{ my: 10, mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}
        onMouseEnter={() => setCurrentStep(1)}
      >
        <Typography variant="h4" gutterBottom>
          Step 1: Initiate Test
        </Typography>
        <Typography variant="subtitle1" sx={{ py: { md: 8, xs: 4 } }}>
          To initiate a reliability test, send a request to the gateway server
          using the following endpoint: <code>{config.endpoint}</code>
        </Typography>
        <Alert severity="info">
          Tip: Click on the payload in the diagram to see the payload structure.
        </Alert>
        <Box sx={{ height: 300, borderRadius: 2 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnDrag={false}
            panOnScroll={false}
          />
        </Box>
      </Box>

      {/* Step 2 */}
      <Box
        sx={{ my: 10, mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}
        onMouseEnter={() => setCurrentStep(2)}
      >
        <Typography variant="h4" gutterBottom>
          Step 2: Complete Test
        </Typography>
        <Typography variant="subtitle1" sx={{ py: { md: 8, xs: 4 } }}>
          Once the test is started, send the test payload to the gateway client
          using the regular <a href="/publish-content">publish </a> flow.
        </Typography>
        <Box sx={{ height: 300, borderRadius: 2 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
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
      {/*  */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "payload"
            ? "Payload"
            : dialogType === "response"
            ? "Response"
            : "Details"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              position: "relative",
              backgroundColor: "background.paper",
              borderRadius: 2,
              p: 2,
              overflowX: "auto",
              fontFamily: "monospace",
              fontSize: 14,
            }}
          >
            <IconButton
              onClick={() => copyToClipboard(dialogContent)}
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CopyOutlined fontSize="small" />
            </IconButton>
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {dialogContent}
            </pre>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Copied to clipboard"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          mb: 10,
        }}
      >
        <Button
          variant="text"
          component="a"
          href="/telemetry-docs"
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
          Back to Telemetry
        </Button>
      </Box>
    </Box>
  );
};

export default ReliabilityTest;
