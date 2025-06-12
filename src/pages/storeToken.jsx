import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Button,
} from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow from "reactflow";
import {
  CloseCircleOutlined,
  CopyOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Client from "../dataFlow/storeToken/client.mdx";
import Vault from "../dataFlow/storeToken/vault.mdx";
import { Link } from "react-router-dom";

const nodeDescriptions = {
  client: {
    title: "Clients (Apps)",
    content: <Client />,
  },
  vault: {
    title: "Vault",
    content: <Vault />,
  },
};

const nodes = [
  {
    id: "client",
    position: { x: 100, y: 200 },
    data: { label: "Client (Apps)" },
    type: "client",
  },
  {
    id: "vault",
    position: { x: 400, y: 200 },
    data: { label: "Vault" },
    type: "vault",
  },
];

const edges = [
  {
    id: "payload",
    source: "client",
    target: "vault",
    animated: true,
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "response",
    source: "vault",
    target: "client",
    animated: true,
    style: { stroke: "#1976d2" },
    type: "offset",
    markerEnd: { type: "arrowclosed", color: "#1976d2" },
  },
];

const StoreToken = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNodeClick = (_, node) => {
    if (node.type === "client" || node.type === "vault") {
      setSelectedNode(node);
    }
  };

  const handleCloseDrawer = () => setSelectedNode(null);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleEdgeClick = (_, edge) => {
    if (edge.id === "payload") {
      setDialogType("payload");
      setDialogContent(`{
  "long_lived_token": "long_lived_token",
  "authorization_code": "oauth2_code",
  "platform": "gmail",
  "protocol": "oauth2"
}`);
    } else if (edge.id === "response") {
      setDialogType("response");
      setDialogContent(`{
  "message": "Token stored successfully.",
  "success": true
}`);
    }

    setDialogOpen(true);
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          pt: { xs: 15, sm: 20, md: 15 },
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
          }}
        >
          Store Token
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }}>
          This step involves storing tokens securely for the authenticated
          entity. That is giving RelaySMS access to publish messages on your
          behalf.
        </Typography>
      </Box>

      {/* Step 1 */}
      <Box sx={{ my: 10, mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}>
        <Alert severity="info">
          Tip: Click on the arrows in the diagram to see the payload structure.
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
        <Typography variant="subtitle1" sx={{ py: { md: 8, xs: 4 } }}>
          You can store tokens for the follwing platforms:
          <ul>
            <li>Gmail</li>
            <li>Twitter</li>
            <li>Telegram</li>
          </ul>
        </Typography>
      </Box>

      {/* Drawer */}
      <Drawer anchor="right" open={!!selectedNode} onClose={handleCloseDrawer}>
        <Box sx={{ width: 400, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">
              {selectedNode && nodeDescriptions[selectedNode.type]?.title}
            </Typography>
            <IconButton onClick={handleCloseDrawer}>
              <CloseCircleOutlined />
            </IconButton>
          </Box>
          {selectedNode && nodeDescriptions[selectedNode.type]?.content}
        </Box>
      </Drawer>

      {/* Dialog */}
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
          justifyContent: "space-between",
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          my: 5,
        }}
      >
        <Button
          variant="text"
          component="a"
          href="/authenticate-entity"
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
          Back to Authenticate Entity
        </Button>
        <Button
          variant="text"
          component="a"
          href="/publish-content"
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
          Continue to Publish Content
        </Button>
      </Box>
    </Box>
  );
};

export default StoreToken;
