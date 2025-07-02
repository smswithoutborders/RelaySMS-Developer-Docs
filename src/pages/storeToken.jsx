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
   Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
};      {/* ===== */}


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
  <Box sx={{ my: 10, mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}>
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
      <Box>
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

      {/* Store an Entity's Token */}
      <Typography variant="h4" gutterBottom mt={4}>
        Store an Entity's Token
      </Typography>
      <Typography paragraph>
        This step involves storing tokens securely for the authenticated entity.
      </Typography>
      <hr />

      {/* Request */}
      <Typography variant="h6" gutterBottom mt={2}>
        Request
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>request</code> <strong>StoreEntityTokenRequest</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the required fields for this step. Other fields will be ignored.
      </Alert>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="StoreEntityTokenRequest required fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "long_lived_token", type: "string", description: "The long-lived token for the authenticated session." },
              { field: "token", type: "string", description: "The token to be stored." },
              { field: "platform", type: "string", description: 'The platform from which the token is being issued. (e.g., "gmail").' },
              { field: "account_identifier", type: "string", description: "The identifier of the account associated with the token." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle2" gutterBottom>
        Optional fields:
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="StoreEntityTokenRequest optional fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>code_verifier</TableCell>
              <TableCell>string</TableCell>
              <TableCell>A cryptographic random string used in the PKCE flow.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Response */}
      <Typography variant="h6" gutterBottom mt={4}>
        Response
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>response</code> <strong>StoreEntityTokenResponse</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the fields that are populated for this step. Other fields may be empty, omitted, or false.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="StoreEntityTokenResponse fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "message", type: "string", description: "A response message from the server." },
              { field: "success", type: "boolean", description: "Indicates if the operation was successful." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Method */}
      <Typography variant="h6" gutterBottom mt={4}>
        Method
      </Typography>
      <Typography paragraph>
        <code>method</code> <strong>StoreEntityToken</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The examples below use{" "}
        <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">
          grpcurl
        </a>
        .
      </Alert>
      <Alert severity="info" sx={{ mb: 3 }}>
        Here is what a successful response from the server looks like.<br />
        The server would return a status code of <code>0 OK</code> if the API transaction goes through without any friction. Otherwise, it will return any other code out of the{" "}
        <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noopener noreferrer">
          17 codes supported by gRPC
        </a>.
      </Alert>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Sample request
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
localhost:6000 vault.v1.Entity/StoreEntityToken <payload.json`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
  "long_lived_token": "long_lived_token",
  "authorization_code": "oauth2_code",
  "platform": "gmail",
  "protocol": "oauth2"
}`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
  "message": "Token stored successfully.",
  "success": true
}`}
      </Box>

      {/* Get Entity Access Token */}
      <Typography variant="h4" gutterBottom mt={4}>
        Get Entity Access Token
      </Typography>
      <Typography paragraph>
        This function retrieves an entity's access token.
      </Typography>
      <hr />

      {/* Request */}
      <Typography variant="h6" gutterBottom mt={2}>
        Request
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>request</code> <strong>GetEntityAccessTokenRequest</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the required fields for this step. Other fields will be ignored.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="GetEntityAccessTokenRequest required fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              {
                field: "device_id or phone_number or long_lived_token",
                type: "string",
                description:
                  "The unique identifier of the device or the phone number or the long lived token used by the entity.",
              },
              { field: "platform", type: "string", description: 'The platform from which the token is being issued. (e.g., "gmail").' },
              { field: "account_identifier", type: "string", description: "The identifier of the account associated with the token." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Response */}
      <Typography variant="h6" gutterBottom mt={4}>
        Response
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>response</code> <strong>GetEntityAccessTokenResponse</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the fields that are populated for this step. Other fields may be empty, omitted, or false.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="GetEntityAccessTokenResponse fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "message", type: "string", description: "A response message from the server." },
              { field: "success", type: "bool", description: "Indicates if the operation was successful." },
              { field: "token", type: "string", description: "The retrieved token associated with the entity for the specified platform." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Method */}
      <Typography variant="h6" gutterBottom mt={4}>
        Method
      </Typography>
      <Typography paragraph>
        <code>method</code> <strong>GetEntityAccessToken</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The examples below use{" "}
        <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">
          grpcurl
        </a>
        .
      </Alert>
      <Alert severity="info" sx={{ mb: 3 }}>
        Here is what a successful response from the server looks like.<br />
        The server would return a status code of <code>0 OK</code> if the API transaction goes through without any friction. Otherwise, it will return any other code out of the{" "}
        <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noopener noreferrer">
          17 codes supported by gRPC
        </a>.
      </Alert>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Sample request
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
    -d '{"device_id": "device_id", "platform": "gmail", "account_identifier": "sample@mail.com"}' \\
    -proto protos/v1/vault.proto \\
localhost:6000 vault.v1.Entity/GetEntityAccessToken`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
  "message": "Successfully fetched tokens",
  "success": true,
  "token": "retrieved_token"
}`}
      </Box>

      {/* Decrypt Payload */}
      <Typography variant="h4" gutterBottom mt={4}>
        Decrypt Payload
      </Typography>
      <Typography paragraph>
        This function handles decrypting payload content.
      </Typography>
      <hr />

      {/* Request */}
      <Typography variant="h6" gutterBottom mt={2}>
        Request
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>request</code> <strong>DecryptPayloadRequest</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the required fields for this step. Other fields will be ignored.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="DecryptPayloadRequest required fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              {
                field: "device_id or phone_number",
                type: "string",
                description: "The unique identifier of the device or the phone number used by the entity.",
              },
              { field: "payload_ciphertext", type: "string", description: "The encrypted payload ciphertext that needs to be decrypted." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Response */}
      <Typography variant="h6" gutterBottom mt={4}>
        Response
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>response</code> <strong>DecryptPayloadResponse</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the fields that are populated for this step. Other fields may be empty, omitted, or false.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="DecryptPayloadResponse fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "message", type: "string", description: "A response message from the server." },
              { field: "success", type: "bool", description: "Indicates if the operation was successful." },
              { field: "payload_plaintext", type: "string", description: "The decrypted payload plaintext." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Method */}
      <Typography variant="h6" gutterBottom mt={4}>
        Method
      </Typography>
      <Typography paragraph>
        <code>method</code> <strong>DecryptPayload</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The examples below use{" "}
        <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">
          grpcurl
        </a>
        .
      </Alert>
      <Alert severity="info" sx={{ mb: 3 }}>
        Here is what a successful response from the server looks like.<br />
        The server would return a status code of <code>0 OK</code> if the API transaction goes through without any friction. Otherwise, it will return any other code out of the{" "}
        <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noopener noreferrer">
          17 codes supported by gRPC
        </a>.
      </Alert>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Sample request
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
    -d '{"device_id": "device_id", "payload_ciphertext": "encrypted_payload"}' \\
    -proto protos/v1/vault.proto \\
localhost:6000 vault.v1.Entity/DecryptPayload`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
  "message": "Successfully decrypted payload",
  "success": true,
  "payload_plaintext": "Decrypted payload content"
}`}
      </Box>

      {/* Encrypt Payload */}
      <Typography variant="h4" gutterBottom mt={4}>
        Encrypt Payload
      </Typography>
      <Typography paragraph>
        This function handles the encryption of payload content.
      </Typography>
      <hr />

      {/* Request */}
      <Typography variant="h6" gutterBottom mt={2}>
        Request
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>request</code> <strong>EncryptPayloadRequest</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the required fields for this step. Other fields will be ignored.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="EncryptPayloadRequest required fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "device_id", type: "string", description: "The unique identifier of the device used by the entity." },
              { field: "payload_plaintext", type: "string", description: "The plaintext payload content to be encrypted." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Response */}
      <Typography variant="h6" gutterBottom mt={4}>
        Response
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>response</code> <strong>EncryptPayloadResponse</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the fields that are populated for this step. Other fields may be empty, omitted, or false.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="EncryptPayloadResponse fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "message", type: "string", description: "A response message from the server." },
              { field: "payload_ciphertext", type: "string", description: "The encrypted payload ciphertext." },
              { field: "success", type: "bool", description: "Indicates if the operation was successful." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Method */}
      <Typography variant="h6" gutterBottom mt={4}>
        Method
      </Typography>
      <Typography paragraph>
        <code>method</code> <strong>EncryptPayload</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The examples below use{" "}
        <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">
          grpcurl
        </a>
        .
      </Alert>
      <Alert severity="info" sx={{ mb: 3 }}>
        Here is what a successful response from the server looks like.<br />
        The server would return a status code of <code>0 OK</code> if the API transaction goes through without any friction. Otherwise, it will return any other code out of the{" "}
        <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noopener noreferrer">
          17 codes supported by gRPC
        </a>.
      </Alert>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Sample request
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
    -d '{"device_id": "device_id", "payload_plaintext": "plaintext_payload"}' \\
    -proto protos/v1/vault.proto \\
localhost:6000 vault.v1.Entity/EncryptPayload`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
  "message": "Successfully encrypted payload.",
  "payload_ciphertext": "encrypted_payload",
  "success": true
}`}
      </Box>

      {/* Update An Entity's Token */}
      <Typography variant="h4" gutterBottom mt={4}>
        Update An Entity's Token
      </Typography>
      <Typography paragraph>
        This function updates tokens associated with an entity.
      </Typography>
      <hr />

      {/* Request */}
      <Typography variant="h6" gutterBottom mt={2}>
        Request
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>request</code> <strong>UpdateEntityTokenRequest</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the required fields for this step. Other fields will be ignored.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="UpdateEntityTokenRequest required fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              {
                field: "device_id or phone_number",
                type: "string",
                description: "The unique identifier of the device or the phone number used by the entity.",
              },
              { field: "token", type: "string", description: "The new token to be updated for the entity." },
              { field: "platform", type: "string", description: 'The platform from which the token is being updated. (e.g., "gmail").' },
              { field: "account_identifier", type: "string", description: "The identifier of the account associated with the token." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Response */}
      <Typography variant="h6" gutterBottom mt={4}>
        Response
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>response</code> <strong>UpdateEntityTokenResponse</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the fields that are populated for this step. Other fields may be empty, omitted, or false.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="UpdateEntityTokenResponse fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "message", type: "string", description: "A response message from the server." },
              { field: "success", type: "bool", description: "Indicates if the operation was successful." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Method */}
      <Typography variant="h6" gutterBottom mt={4}>
        Method
      </Typography>
      <Typography paragraph>
        <code>method</code> <strong>UpdateEntityToken</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The examples below use{" "}
        <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">
          grpcurl
        </a>
        .
      </Alert>
      <Alert severity="info" sx={{ mb: 3 }}>
        Here is what a successful response from the server looks like.<br />
        The server would return a status code of <code>0 OK</code> if the API transaction goes through without any friction. Otherwise, it will return any other code out of the{" "}
        <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noopener noreferrer">
          17 codes supported by gRPC
        </a>.
      </Alert>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Sample request
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
    -d '{"device_id": "device_id", "token": "new_token", "platform": "gmail", "account_identifier": "sample@mail.com"}' \\
    -proto protos/v1/vault.proto \\
localhost:6000 vault.v1.Entity/UpdateEntityToken`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
  "message": "Token updated successfully.",
  "success": true
}`}
      </Box>

      {/* Delete An Entity's Token */}
      <Typography variant="h4" gutterBottom mt={4}>
        Delete An Entity's Token
      </Typography>
      <Typography paragraph>
        This function deletes tokens associated with an entity.
      </Typography>
      <hr />

      {/* Request */}
      <Typography variant="h6" gutterBottom mt={2}>
        Request
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>request</code> <strong>DeleteEntityTokenRequest</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the required fields for this step. Other fields will be ignored.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="DeleteEntityTokenRequest required fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "long_lived_token", type: "string", description: "The long-lived token for the authenticated session." },
              { field: "platform", type: "string", description: 'The platform from which the token is being updated. (e.g., "gmail").' },
              { field: "account_identifier", type: "string", description: "The identifier of the account associated with the token." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Response */}
      <Typography variant="h6" gutterBottom mt={4}>
        Response
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code>response</code> <strong>DeleteEntityTokenResponse</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The table lists only the fields that are populated for this step. Other fields may be empty, omitted, or false.
      </Alert>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small" aria-label="DeleteEntityTokenResponse fields">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { field: "message", type: "string", description: "A response message from the server." },
              { field: "success", type: "bool", description: "Indicates if the operation was successful." },
            ].map(({ field, type, description }) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Method */}
      <Typography variant="h6" gutterBottom mt={4}>
        Method
      </Typography>
      <Typography paragraph>
        <code>method</code> <strong>DeleteEntityToken</strong>
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        The examples below use{" "}
        <a href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">
          grpcurl
        </a>
        .
      </Alert>
      <Alert severity="info" sx={{ mb: 3 }}>
        Here is what a successful response from the server looks like.<br />
        The server would return a status code of <code>0 OK</code> if the API transaction goes through without any friction. Otherwise, it will return any other code out of the{" "}
        <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html" target="_blank" rel="noopener noreferrer">
          17 codes supported by gRPC
        </a>.
      </Alert>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Sample request
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
localhost:6000 vault.v1.Entity/DeleteEntityToken <payload.json`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
  >        {`{
  "long_lived_token": "long_lived_token",
  "platform": "gmail",
  "account_identifier": "sample@mail.com"
}`}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 5 }}>
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
  >        {`{
  "message": "Token deleted successfully.",
  "success": true
}`}
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
