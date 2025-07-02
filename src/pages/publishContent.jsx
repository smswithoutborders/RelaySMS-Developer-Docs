import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Button,
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Link, Alert
} from "@mui/material";
import { CloseCircleOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Overview from "./overview";

const nodeDescriptions = {
  Client: { title: "Clients (Apps)" },
  GatewayClient: { title: "Gateway Client"},
  GatewayServer: { title: "Gateway Server"},
  Publisher: { title: "Publisher"},
  BridgeServer: { title: "Bridge Server" },
  Vault: { title: "Vault" },
  ExternalPlatforms: { title: "External Platforms"},
  ExternalBridges: { title: "External Bridges" },
  EmailBridge: { title: "Gmail Bridges" },
  Gmail: { title: "Gmail"},
  Twitter: { title: "Twitter" },
  Telegram: {title: "Telegram" },
};

const PublishContent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState("");

  const handleDrawerOpen = (key) => {
    const node = nodeDescriptions[key];
    if (node) {
      setDrawerContent(node.content);
      setDrawerTitle(node.title);
      setDrawerOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setDrawerContent(null);
    setDrawerTitle("");
  };

  return (
    <Box>
      <Box sx={{ pt: { xs: 15, sm: 20, md: 15 }, textAlign: "center", mx: { xs: 2, md: 15, sm: 10, lg: 25 } }}>
        <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "3rem", sm: "4rem", md: "6rem" }}>
          Publish Content
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }}>
          This method handles publishing a relaysms payload.
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center", mx: { xs: 2, md: 15, sm: 10, lg: 25 }, mb: { xs: 6, md: 15 } }}>
        <Overview handleDrawerOpen={handleDrawerOpen} />
      </Box>

      <Box sx={{ mx: { xs: 2, md: 15 }, my: 3, mb: 10 }}>
      {/* Request Section */}
      <Typography variant="h5" gutterBottom>
        Request
      </Typography>
      <Typography>
        <strong>request</strong> <code>PublishContentRequest</code>
      </Typography>

      <Alert severity="warning" sx={{ my: 2 }}>
        <strong>Important:</strong> The table lists only the required fields for this step. Other fields will be ignored.
      </Alert>

      <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
        <Table size="small" aria-label="request fields table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>string</TableCell>
              <TableCell>The content payload to be published.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>metadata</TableCell>
              <TableCell>map&lt;string, string&gt;</TableCell>
              <TableCell>Metadata about the content.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {/* Response Section */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Response
        </Typography>
        <Typography>
          <strong>response</strong> <code>PublishContentResponse</code>
        </Typography>

        <Alert severity="warning" sx={{ my: 2 }}>
          <strong>Important:</strong> The table lists only the fields that are populated for this step. Other fields may be empty, omitted, or false.
        </Alert>

        <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
          <Table size="small" aria-label="response fields table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Field</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>message</TableCell>
                <TableCell>string</TableCell>
                <TableCell>A response message from the server.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>publisher_response</TableCell>
                <TableCell>string</TableCell>
                <TableCell>The encrypted response from the publisher, if any.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>success</TableCell>
                <TableCell>bool</TableCell>
                <TableCell>Indicates if the operation was successful.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Method Section */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Method
        </Typography>
        <Typography>
          <strong>method</strong> <code>PublishContent</code>
        </Typography>

        <Alert severity="info" sx={{ my: 2 }}>
          <strong>Tip:</strong> The examples below use{' '}
          <Link href="https://github.com/fullstorydev/grpcurl#grpcurl" target="_blank" rel="noopener noreferrer">
            grpcurl
          </Link>.
        </Alert>

        <Typography variant="h6" gutterBottom>
          Sample request
        </Typography>
       
        <Paper variant="outlined"sx={(theme) => ({
             backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
  color: theme.palette.text.primary,
  p: 2,
  borderRadius: 2,
  overflow: 'auto',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  whiteSpace: 'pre-wrap',
            })}
            >
          {`grpcurl -plaintext \\
    -d @ \\
    -proto protos/v1/publisher.proto \\
localhost:6000 publisher.v1.Publisher/PublishContent <payload.json`}
        </Paper>

        <Typography variant="h6" mt={4} gutterBottom>
          Sample payload.json
        </Typography>
        <Paper variant="outlined" sx={(theme) => ({
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
    })}>
          {`{
  "content": "encoded_relay_sms_payload",
  "metadata": {
    "From": "+1234567890"
  }
}`}
        </Paper>

        <Typography variant="h6" mt={4} gutterBottom>
          Sample response
        </Typography>
        <Paper variant="outlined" sx={(theme) => ({
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
    })}>
          {`{
  "message": "Successfully published Gmail message",
  "publisher_response": "encrypted_response_payload",
  "success": true
}`}
        </Paper>
      </Box>
    </Box>


      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400, lg: 600 }, p: 3 } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            {drawerTitle || "Details"}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseCircleOutlined style={{ fontSize: 24 }} />
          </IconButton>
        </Box>
        <Box mt={2}>{drawerContent}</Box>
      </Drawer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: { xs: 2, md: 15 },
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
            fontSize: { md: "1rem", xs: "0.8rem" },
            color: "primary.main",
            "&:hover": { textDecoration: "none" },
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
            fontSize: { md: "1rem", xs: "0.8rem" },
            color: "primary.main",
            "&:hover": { textDecoration: "none" },
          }}
        >
          Continue to Telemetry
        </Button>
      </Box>
    </Box>
  );
};

export default PublishContent;
