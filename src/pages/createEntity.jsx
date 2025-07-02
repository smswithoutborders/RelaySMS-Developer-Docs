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
  Divider,
} from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow from "reactflow";
import {
  CloseCircleOutlined,
  CopyOutlined,
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
    sourcePosition: "top",
    targetPosition: "bottom",
  },
  {
    id: "vault",
    position: { x: 400, y: 200 },
    data: { label: "Vault" },
    type: "vault",
    sourcePosition: "bottom",
    targetPosition: "top",
  },
];

const edges = [
  {
    id: "payload",
    source: "client",
    target: "vault",
    animated: true,
    type: "step",
    markerEnd: { type: "arrowclosed", width: 20, height: 20 },
    label: "Request Payload",
  },
  {
    id: "response",
    source: "vault",
    target: "client",
    animated: true,
    style: { stroke: "#1976d2" },
    type: "step",
    markerEnd: { type: "arrowclosed", width: 20, height: 20, color: "#1976d2" },
    label: "Response Payload",
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

        {/*  explanation */}
{/* explanation */}
<Box sx={{ mt: 6 }}>
  <Typography variant="h5" gutterBottom>
    📱 Client Guide: Creating an Entity
  </Typography>
  <Typography variant="body1" paragraph>
    This guide explains how your client app (mobile or CLI) can create an entity in the RelaySMS Vault.
    An <strong>entity</strong> represents a secure user identity tied to a phone number.
  </Typography>

  <Typography variant="body1" paragraph>
    Creating an entity involves:
  </Typography>
  <ul>
    <li>Proving ownership of the phone number</li>
    <li>Submitting a secure registration payload</li>
    <li>Receiving keys and a long-lived token for future requests</li>
  </ul>

  <Divider sx={{ my: 4 }} />

  <Typography variant="h6" gutterBottom>
    🧩 Step 1: Initiate Entity Creation
  </Typography>
  <Typography variant="body1" paragraph>
    Your app must first initiate the creation request using the user's phone number and public keys.
  </Typography>

  <Typography variant="subtitle1" gutterBottom>
    🔐 Required Fields
  </Typography>

  <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mb: 3 }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid #ccc', padding: 8 }}>Field</th>
        <th style={{ border: '1px solid #ccc', padding: 8 }}>Type</th>
        <th style={{ border: '1px solid #ccc', padding: 8 }}>Description</th>
      </tr>
    </thead>
    <tbody>
      {[
        ['phone_number', 'string', 'E.164 format, e.g., `+237123456789`'],
        ['country_code', 'string', 'ISO 3166-1 alpha-2 format, e.g., `CM`'],
        ['password', 'string', 'Chosen password for the entity'],
        ['client_publish_pub_key', 'string', 'Base64-encoded X25519 public key for publishing'],
        ['client_device_id_pub_key', 'string', 'Base64-encoded X25519 public key for device identification'],
      ].map(([field, type, desc]) => (
        <tr key={field}>
          <td style={{ border: '1px solid #ccc', padding: 8 }}>{field}</td>
          <td style={{ border: '1px solid #ccc', padding: 8 }}>{type}</td>
          <td style={{ border: '1px solid #ccc', padding: 8 }}>{desc}</td>
        </tr>
      ))}
    </tbody>
  </Box>

  <Typography variant="subtitle1" gutterBottom>
    ▶️ Example Payload
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2, overflowX: 'auto' }}>
    {`{
  "country_code": "CM",
  "phone_number": "+237123456789",
  "password": "Password@123",
  "client_publish_pub_key": "BASE64_X25519_PUB_KEY",
  "client_device_id_pub_key": "BASE64_X25519_DEVICE_ID_KEY"
}`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 3 }}>
    ✅ Expected Response
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`{
  "requiresOwnershipProof": true,
  "message": "OTP sent successfully. Check your phone for the code.",
  "nextAttemptTimestamp": 1717323582
}`}
  </Box>

  <Alert severity="info" sx={{ mt: 2 }}>
    📌 If <code>requiresOwnershipProof</code> is true, the user must enter the OTP sent via SMS.
  </Alert>

  <Typography variant="h6" sx={{ mt: 6 }}>
    🧾 Step 2: Complete Entity Creation
  </Typography>
  <Typography variant="body1" paragraph>
    Once the user enters the OTP, your app must submit the final entity creation request.
  </Typography>

  <Typography variant="subtitle1">▶️ Sample Request Payload</Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`{
  "country_code": "CM",
  "phone_number": "+237123456789",
  "password": "Password@123",
  "ownership_proof_response": "123456",
  "client_publish_pub_key": "BASE64_X25519_PUB_KEY",
  "client_device_id_pub_key": "BASE64_X25519_DEVICE_ID_KEY"
}`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 3 }}>
    ✅ Sample Response
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`{
  "longLivedToken": "AUTH_TOKEN_HERE",
  "serverPublishPubKey": "SERVER_X25519_PUB_KEY",
  "serverDeviceIdPubKey": "SERVER_X25519_DEVICE_ID_KEY",
  "message": "Entity created successfully"
}`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 4 }}>
    🎯 After Successful Creation
  </Typography>
  <ul>
    <li>🔐 Securely store the <code>longLivedToken</code> (e.g., encrypted local storage)</li>
    <li>📦 Cache the <code>serverPublishPubKey</code> and <code>serverDeviceIdPubKey</code> for secure communication</li>
    <li>📲 Redirect the user to the app’s main screen or dashboard</li>
  </ul>

  <Typography variant="subtitle1" sx={{ mt: 4 }}>
    🛡️ Best Practices
  </Typography>
  <ul>
    <li>Never send private keys to the server</li>
    <li>Regenerate keys on every new device installation</li>
    <li>Encrypt sensitive data at rest</li>
    <li>Use a secure random generator for key generation</li>
  </ul>

  <Typography variant="subtitle1" sx={{ mt: 4 }}>
    🧪 Optional: CLI Test with grpcurl
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`grpcurl -plaintext \\
  -d @ \\
  -proto protos/v1/vault.proto \\
  localhost:6000 vault.v1.Entity/CreateEntity < payload.json`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 4 }}>
    📚 Related Resources
  </Typography>
  <ul>
    <li><a href="https://github.com/smswithoutborders/RelaySMS-Android" target="_blank" rel="noopener noreferrer">RelaySMS Android</a></li>
    <li><a href="https://github.com/smswithoutborders/RelaySMS-iOS" target="_blank" rel="noopener noreferrer">RelaySMS iOS</a></li>
  </ul>
</Box>

        {/* ======================================= */}
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

        {/* Vault-side Explanation */}
<Box sx={{ mt: 10 }}>
  <Typography variant="h5" gutterBottom>
    🏛️ Vault Guide: Handling Entity Creation Requests
  </Typography>
  <Typography variant="body1" paragraph>
    The Vault is responsible for securely registering new entities and verifying client ownership of phone numbers. An <strong>entity</strong> represents a user identity within the Vault system.
  </Typography>

  <Typography variant="body1" paragraph>
    This process involves:
  </Typography>
  <ul>
    <li>Receiving entity creation requests from clients</li>
    <li>Verifying phone number ownership via OTP</li>
    <li>Completing entity creation with secure token and key exchange</li>
  </ul>

  <Divider sx={{ my: 4 }} />

  <Typography variant="h6" gutterBottom>
    🧩 Step 1: Handle Initiate Creation Request
  </Typography>
  <Typography variant="body1" paragraph>
    Upon receiving the initial <code>CreateEntityRequest</code>, the Vault must:
  </Typography>
  <ul>
    <li>Verify the phone number format</li>
    <li>Trigger OTP delivery to the user via SMS</li>
    <li>Store a pending entity entry with public keys and temporary data</li>
    <li>Respond with OTP status and next retry time</li>
  </ul>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    📥 Request (proto)
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2, fontSize: '0.9rem' }}>
    {`message CreateEntityRequest {
  string phone_number = 1;
  string country_code = 2;
  string password = 3;
  string client_publish_pub_key = 4;
  string client_device_id_pub_key = 5;
}`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    📤 Vault Actions
  </Typography>
  <ul>
    <li>Generate and send OTP to <code>phone_number</code></li>
    <li>Store request in a temporary entity pool</li>
    <li>Set retry window and expiration</li>
  </ul>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    ✅ Response (CreateEntityResponse)
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`message CreateEntityResponse {
  bool requires_ownership_proof = 1;
  string message = 2;
  int32 next_attempt_timestamp = 3;
}`}
  </Box>

  <Divider sx={{ my: 4 }} />

  <Typography variant="h6">
    🧾 Step 2: Handle Complete Entity Creation
  </Typography>
  <Typography variant="body1" paragraph>
    After the client proves phone ownership (via OTP), the Vault receives another <code>CreateEntityRequest</code> — this time with the <code>ownership_proof_response</code> field.
  </Typography>

  <Typography variant="subtitle1" sx={{ mt: 1 }}>
    📨 Extended Request Fields
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`message CreateEntityRequest {
  string phone_number = 1;
  string country_code = 2;
  string password = 3;
  string ownership_proof_response = 4;
  string client_publish_pub_key = 5;
  string client_device_id_pub_key = 6;
}`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    🔐 Vault Actions
  </Typography>
  <ul>
    <li>Validate OTP with stored proof</li>
    <li>If valid:
      <ul>
        <li>Generate and store a new entity record</li>
        <li>Issue a long-lived token (JWT or similar)</li>
        <li>Return Vault’s public keys</li>
      </ul>
    </li>
    <li>If invalid:
      <ul>
        <li>Return error and throttle retries</li>
      </ul>
    </li>
  </ul>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    ✅ Final Response (CreateEntityResponse)
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`message CreateEntityResponse {
  string message = 1;
  string server_publish_pub_key = 2;
  string server_device_id_pub_key = 3;
  string long_lived_token = 4;
}`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    🔁 Sample Successful Response
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`{
  "message": "Entity created successfully",
  "serverPublishPubKey": "VAULT_X25519_PUB_KEY",
  "serverDeviceIdPubKey": "VAULT_DEVICE_ID_KEY",
  "longLivedToken": "vault_token_string"
}`}
  </Box>

  <Divider sx={{ my: 4 }} />

  <Typography variant="subtitle1">
    📌 Vault Requirements
  </Typography>
  <ul>
    <li>Store encrypted passwords and tokens (e.g., using bcrypt + AES)</li>
    <li>Enforce OTP expiration and retry limits</li>
    <li>Ensure <code>long_lived_token</code> is securely generated (e.g., HMAC or JWT)</li>
    <li>Prevent duplicate entities for the same <code>phone_number</code></li>
  </ul>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    🧪 Testing via CLI (grpcurl)
  </Typography>
  <Box component="pre" sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 2 }}>
    {`grpcurl -plaintext \\
  -d @ \\
  -proto protos/v1/vault.proto \\
  localhost:6000 vault.v1.Entity/CreateEntity < payload.json`}
  </Box>

  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    🛡️ Security Notes
  </Typography>
  <ul>
    <li>OTPs should be single-use and time-limited (e.g., 5 minutes)</li>
    <li>All keys must use X25519 and be base64-encoded</li>
    <li>Long-lived tokens must be scoped and revocable</li>
    <li>Avoid storing raw OTPs — use a hash with timestamp</li>
  </ul>
</Box>

      </Box>

      {/* Drawer */}
      <Drawer
        PaperProps={{ sx: { width: { xs: "100%", sm: 400, lg: 600 }, p: 3 } }}
        anchor="right"
        open={!!selectedNode}
        onClose={handleCloseDrawer}
      >
        <Box>
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
          justifyContent: "flex-end",
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
          mb: 10,
        }}
      >
        <Button
          variant="text"
          component="a"
          href="/authenticate-entity"
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
          Continue to Authentication
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEntity;
