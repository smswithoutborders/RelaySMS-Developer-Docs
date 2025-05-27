import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Grid,
  Button,
} from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import {
  CloseCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Publisher from "../dataFlow/telemetry/publisher.mdx";
import Vault from "../dataFlow/telemetry/vault.mdx";
import TelemetryAggregator from "../dataFlow/telemetry/telemetryAggregator.mdx";

const nodeDescriptions = {
  vault: {
    title: "Vault",
    content: <Vault />,
    id: "vault",
  },
  Publisher: {
    title: "Publisher",
    content: <Publisher />,
    id: "publisher",
  },
  aggregator: {
    title: "Telemetry Aggregator",
    content: <TelemetryAggregator />,
    id: "aggregator",
  },
};

const nodes = [
  {
    id: "vault",
    position: { x: 200, y: 50 },
    data: { label: "Vault" },
    type: "vault",
  },
  {
    id: "publisher",
    position: { x: 400, y: 50 },
    data: { label: "Publisher" },
    type: "publisher",
  },
  {
    id: "aggregator",
    position: { x: 300, y: 200 },
    data: { label: "Telemetry Aggregator" },
    type: "aggregator", 
  },
];

const edges = [
  { id: "e-vault-agg", source: "vault", target: "aggregator", animated: true },
  {
    id: "e-publisher-agg",
    source: "publisher",
    target: "aggregator",
    animated: true,
  },
];

const Telemetry = () => {
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
          Telemetry
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }} wrap>
          RelaySMS Telemetry provides a comprehensive overview of the RelaySMS
          usage and performance across various components. It includes detailed
          information about the clients, publishers, gateways clients, and
          vaults involved in the RelaySMS ecosystem. This telemetry data is
          crucial for monitoring system health, diagnosing issues, and
          optimizing performance.
        </Typography>
      </Box>
      {/*  */}

      <Box
        sx={{
          pt: { xs: 2, sm: 2, md: 2 },
          my: "auto",
          alignContent: "center",
          textAlign: "center",
          mb: { xs: 6, md: 15, sm: 10, lg: 8 },
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Box sx={{ height: 300, borderRadius: 2 }}>
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
          href="/publish-content"
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
          Back to Publish Content
        </Button>
        <Button
          variant="text"
          component="a"
          href="/reliability-test"
          endIcon={<RightOutlined />}
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
          Continue to Reliability Test
        </Button>
      </Box>
    </Box>
  );
};

export default Telemetry;
