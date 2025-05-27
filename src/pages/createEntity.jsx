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
import { CloseCircleOutlined, CopyOutlined } from "@ant-design/icons";
import Client from "../dataFlow/createEntity/client.mdx";
import Vault from "../dataFlow/createEntity/vault.mdx";

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

const CreateEntity = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
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
    if (currentStep === 1) {
      if (edge.id === "payload") {
        setDialogType("payload");
        setDialogContent(`{
  "country_code": "CM",
  "phone_number": "+237123456789",
  "password": "Password@123",
  "client_publish_pub_key": "x25519 client publish public key",
  "client_device_id_pub_key": "x25519 client device_id public key"
}`);
      } else if (edge.id === "response") {
        setDialogType("response");
        setDialogContent(`{
  "requires_ownership_proof": true,
  "next_attempt_timestamp": 1700000000,
  "message": "OTP sent successfully. Check your phone for the code."
}`);
      }
    } else if (currentStep === 2) {
      if (edge.id === "payload") {
        setDialogType("payload");
        setDialogContent(`{
  "country_code": "CM",
  "phone_number": "+237123456789",
  "password": "Password@123",
  "client_publish_pub_key": "x25519 client publish public key",
  "client_device_id_pub_key": "x25519 client device_id public key",
  "ownership_proof_response": "123456"
}`);
      } else if (edge.id === "response") {
        setDialogType("response");
        setDialogContent(`{
  "longLivedToken": "long_lived_token",
  "serverPublishPubKey": "x25519 server publish public key",
  "serverDeviceIdPubKey": "x25519 server publish public key",
  "message": "Entity created successfully"
}`);
      }
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
          Create Entity
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }}>
          An entity represents a user or client in the vault.
        </Typography>
      </Box>

      {/* Step 1 */}
      <Box
        sx={{ my: 10, mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}
        onMouseEnter={() => setCurrentStep(1)}
      >
        <Typography variant="h4" gutterBottom>
          Step 1: Initiate Creation
        </Typography>
        <Typography variant="subtitle1" sx={{ py: { md: 8, xs: 4 } }}>
          Before creating an entity, you must prove ownership of the phone
          number you intend to use. This step ensures the security and
          authenticity of the entity creation process.
        </Typography>
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
      </Box>

      {/* Step 2 */}
      <Box
        sx={{ my: 10, mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}
        onMouseEnter={() => setCurrentStep(2)}
      >
        <Typography variant="h4" gutterBottom>
          Step 2: Complete Creation
        </Typography>
        <Typography variant="subtitle1" sx={{ py: { md: 8, xs: 4 } }}>
          Ensure that you have completed the Initiate Creation step before
          executing this step.
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
    </Box>
  );
};

export default CreateEntity;
