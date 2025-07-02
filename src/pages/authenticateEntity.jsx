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
import { Link } from "react-router-dom";

const nodeDescriptions = {
  client: {
    title: "Clients (Apps)",
  },
  vault: {
    title: "Vault",
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

const AuthenticateEntity = () => {
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
  "phone_number": "+237123456789",
  "password": "Password@123",
  "client_publish_pub_key": "x25519 client publish public key",
  "client_device_id_pub_key": "x25519 client device_id public key"
}`);
      } else if (edge.id === "response") {
        setDialogType("response");
        setDialogContent(`{
  "requiresOwnershipProof": true,
  "message": "OTP sent successfully. Check your phone for the code.",
  "nextAttemptTimestamp": 1717323582
}`);
      }
    } else if (currentStep === 2) {
      if (edge.id === "payload") {
        setDialogType("payload");
        setDialogContent(`{
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
  "message": "Entity authenticated successfully!"
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
          Authenticate Entity
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
          Step 1: Initiate Authentication
        </Typography>
        <Typography variant="subtitle1" sx={{ py: { md: 8, xs: 4 } }}>
          This step involves verifying the phone number and password, triggering
          a proof of ownership for the phone number.
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
      {/* =========================== */}
  <Typography variant="h6" gutterBottom>
    Request: <code>AuthenticateEntityRequest</code>
  </Typography>
  <Alert severity="info" sx={{ mb: 2 }}>
    Only required fields are listed. Others will be ignored.
  </Alert>

  <Box sx={{ overflowX: "auto" }}>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>phone_number</td><td>string</td><td>The phone number in <a href="https://en.wikipedia.org/wiki/E.164" target="_blank" rel="noopener noreferrer">E164 format</a>, e.g., +237123456789</td></tr>
        <tr><td>password</td><td>string</td><td>A secure password for the entity.</td></tr>
        <tr><td>client_publish_pub_key</td><td>string</td><td>An <code>X25519</code> public key for publishing (base64 encoded).</td></tr>
        <tr><td>client_device_id_pub_key</td><td>string</td><td>An <code>X25519</code> public key for device ID (base64 encoded).</td></tr>
      </tbody>
    </table>
  </Box>

  <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
    Response: <code>AuthenticateEntityResponse</code>
  </Typography>
  <Alert severity="info" sx={{ mb: 2 }}>
    Only fields populated for this step are shown.
  </Alert>

  <Box sx={{ overflowX: "auto" }}>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>requires_ownership_proof</td><td>bool</td><td><code>true</code> if ownership proof is required.</td></tr>
        <tr><td>requires_password_reset</td><td>bool</td><td><code>true</code> if user must reset their password.</td></tr>
        <tr><td>next_attempt_timestamp</td><td>int32</td><td>Next available time to request a new proof (Unix seconds).</td></tr>
        <tr><td>message</td><td>string</td><td>Response message from the server.</td></tr>
      </tbody>
    </table>
  </Box>

  <Typography variant="h6" sx={{ mt: 5 }}>
    Method: <code>AuthenticateEntity</code>
  </Typography>

  <Alert severity="info" sx={{ my: 2 }}>
    The examples below use <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">grpcurl</a>.
  </Alert>

  <Typography sx={{ my: 2 }}>
    A successful response will return status code <strong>0 OK</strong>. Otherwise, see supported
    <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noopener noreferrer"> gRPC status codes</a>.
  </Typography>

  <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
    Sample Request
  </Typography>
  <Box
    component="pre"
    sx={(theme) => ({
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : theme.palette.grey[100],
      color: theme.palette.text.primary,
      p: 2,
      borderRadius: 2,
      overflow: "auto",
      fontFamily: "monospace",
      fontSize: "0.875rem",
    })}
  >
    {`grpcurl -plaintext \\
  -d @ \\
  -proto protos/v1/vault.proto \\
  localhost:6000 vault.v1.Entity/AuthenticateEntity <payload.json`}
  </Box>

  <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
    Sample payload.json
  </Typography>
  <Box
    component="pre"
    sx={(theme) => ({
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : theme.palette.grey[100],
      color: theme.palette.text.primary,
      p: 2,
      borderRadius: 2,
      overflow: "auto",
      fontFamily: "monospace",
      fontSize: "0.875rem",
    })}
  >
    {`{
  "phone_number": "+237123456789",
  "password": "Password@123",
  "client_publish_pub_key": "x25519 client publish public key",
  "client_device_id_pub_key": "x25519 client device_id public key"
}`}
  </Box>

  <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
    Sample response
  </Typography>
  <Box
    component="pre"
    sx={(theme) => ({
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : theme.palette.grey[100],
      color: theme.palette.text.primary,
      p: 2,
      borderRadius: 2,
      overflow: "auto",
      fontFamily: "monospace",
      fontSize: "0.875rem",
    })}
  >
    {`{
  "requiresOwnershipProof": true,
  "message": "OTP sent successfully. Check your phone for the code.",
  "nextAttemptTimestamp": 1717323582
}`}
  </Box>
</Box>

      

      {/*=========================== Step 2============================= */}
      <Box
        sx={{ my: 10, mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}
        onMouseEnter={() => setCurrentStep(2)}
      >
        <Typography variant="h4" gutterBottom>
          Step 2: Complete Authentication
        </Typography>
  <Alert severity="warning" sx={{ my: 2 }}>
    Ensure that you have completed the <strong>Initiate Authentication</strong> step before executing this step.
  </Alert>
   
  <Typography variant="subtitle1" gutterBottom>
    <strong>Request:</strong> <code>AuthenticateEntityRequest</code>
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

 <Alert severity="info" sx={{ my: 2 }}>
    The table lists only the required fields for this step. Other fields will be ignored.
  </Alert>
  <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", my: 2 }}>
    <thead>
      <tr>
        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Field</th>
        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Type</th>
        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>phone_number</td><td>string</td><td>Phone number in <a href="https://en.wikipedia.org/wiki/E.164" target="_blank" rel="noreferrer">E164 format</a></td></tr>
      <tr><td>password</td><td>string</td><td>A secure password for the entity</td></tr>
      <tr><td>ownership_proof_response</td><td>string</td><td>Response from the previous step</td></tr>
      <tr><td>client_publish_pub_key</td><td>string</td><td><code>X25519</code> public key for publishing (base64)</td></tr>
      <tr><td>client_device_id_pub_key</td><td>string</td><td><code>X25519</code> public key for device ID (base64)</td></tr>
    </tbody>
  </Box>

  <Typography variant="subtitle1" gutterBottom>
    <strong>Response:</strong> <code>AuthenticateEntityResponse</code>
  </Typography>

  <Alert severity="info" sx={{ my: 2 }}>
    The table lists only the fields that are populated for this step. Other fields may be empty or omitted.
  </Alert>

  <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", my: 2 }}>
    <thead>
      <tr>
        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Field</th>
        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Type</th>
        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>message</td><td>string</td><td>Response message from server</td></tr>
      <tr><td>server_publish_pub_key</td><td>string</td><td><code>X25519</code> public key for publishing (base64)</td></tr>
      <tr><td>server_device_id_pub_key</td><td>string</td><td><code>X25519</code> public key for device ID (base64)</td></tr>
      <tr><td>long_lived_token</td><td>string</td><td>Token for the authenticated session</td></tr>
    </tbody>
  </Box>

  <Typography variant="subtitle1" gutterBottom>
    <strong>Method:</strong> <code>AuthenticateEntity</code>
  </Typography>

  <Alert severity="info" sx={{ my: 2 }}>
    The examples below use <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noreferrer">grpcurl</a>.
  </Alert>

  <Alert severity="success" sx={{ my: 2 }}>
    The server returns a status code of <strong>0 OK</strong> if successful.
    Otherwise, it returns any of the <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noreferrer">gRPC status codes</a>.
  </Alert>

  <Typography variant="subtitle2" gutterBottom>
    <strong>Sample request:</strong>
  </Typography>

<Box
  component="pre"
  sx={(theme) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    color: theme.palette.text.primary,
    p: 2,
    borderRadius: 2,
    overflow: "auto",
    fontFamily: "monospace",
    fontSize: "0.875rem",
  })}
>

    {`grpcurl -plaintext \\
    -d @ \\
    -proto protos/v1/vault.proto \\
localhost:6000 vault.v1.Entity/AuthenticateEntity <payload.json`}
  </Box>

  <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
    <strong>Sample payload.json:</strong>
  </Typography>

<Box
  component="pre"
  sx={(theme) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    color: theme.palette.text.primary,
    p: 2,
    borderRadius: 2,
    overflow: "auto",
    fontFamily: "monospace",
    fontSize: "0.875rem",
  })}
>

    {`{
  "phone_number": "+237123456789",
  "password": "Password@123",
  "client_publish_pub_key": "x25519 client publish public key",
  "client_device_id_pub_key": "x25519 client device_id public key",
  "ownership_proof_response": "123456"
}`}
  </Box>

  <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
    <strong>Sample response:</strong>
  </Typography>

<Box
  component="pre"
  sx={(theme) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    color: theme.palette.text.primary,
    p: 2,
    borderRadius: 2,
    overflow: "auto",
    fontFamily: "monospace",
    fontSize: "0.875rem",
  })}
>

    {`{
  "longLivedToken": "long_lived_token",
  "serverPublishPubKey": "x25519 server publish public key",
  "serverDeviceIdPubKey": "x25519 server publish public key",
  "message": "Entity authenticated successfully!"
}`}
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
          href="/create-entity"
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
          Back to Create Entity
        </Button>
        <Button
          variant="text"
          component="a"
          href="/store-token"
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
          Continue to Store Token
        </Button>
      </Box>
    </Box>
  );
};

export default AuthenticateEntity;
