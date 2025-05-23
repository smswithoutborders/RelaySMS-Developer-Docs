import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ButtonOutline } from "../components";
import { useNavigate } from "react-router-dom";
import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

const nodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Client" },
    type: "default",
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: { label: "Vault" },
    type: "default",
  },
  {
    id: "3",
    position: { x: 500, y: 0 },
    data: { label: "Publisher" },
    type: "default",
  },
];

const edges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

const Main = () => {
  const navigate = useNavigate();

  const handleNodeClick = (_, node) => {
    if (node.id === "1") navigate("/client");
    else if (node.id === "2") navigate("/vault");
    else if (node.id === "3") navigate("/publish");
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
          RelaySMS System <br />
          Atlas
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }} wrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Box>
      {/*  */}
      <Box
        sx={{
          pt: { xs: 2, sm: 2, md: 2 },
          my: "auto",
          alignContent: "center",
          textAlign: "center",

          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Box sx={{ height: 300, borderRadius: 2, border: "1px solid #ccc" }}>
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
          ></ReactFlow>
        </Box>
      </Box>

      <Box
        sx={{
          pt: { xs: 4, sm: 6, md: 30 },
          my: "auto",
          alignContent: "center",
          textAlign: "center",
          mb: { xs: 6, md: 15, sm: 10, lg: 25 },
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
          className="header"
        >
          RelaySMS Architecture
        </Typography>
        <Typography variant="h6" sx={{ py: { md: 8, xs: 4 } }} wrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline text="Create Entity" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline text="Authenticate Entity" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline text="Store Token" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline text="Publish Content" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline text="Telemetry" />
          </Grid>
          <Grid size={{ md: 4, xs: 6 }}>
            <ButtonOutline text="Reliability Test" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Main;
