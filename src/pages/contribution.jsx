import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { GithubOutlined } from "@ant-design/icons";

const Contribution = () => (
  <Box
    sx={{
      pt: { xs: 12, sm: 16, md: 18 },
      mx: { xs: 2, md: 15, sm: 10, lg: 25 },
      mb: 10,
      textAlign: "center",
    }}
  >
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 6 },
        borderRadius: 4,
        mb: 6,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.6rem", sm: "2rem", md: "3rem" },
          mb: 4,
        }}
        className="header"
      >
        Contribute to RelaySMS <br />
        Documentation
      </Typography>
      <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
        Help us build the best open-source offline messaging documentation!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        This documentation is the central hub for developers, contributors, and
        users of the RelaySMS ecosystem. Our goal is to make it easy for anyone
        to understand, use, and extend RelaySMS and its components.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        We welcome your contributions—whether it's fixing typos, adding guides,
        improving diagrams, or sharing your experience. Every improvement helps
        the community!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Not sure where to start? Check out our open issues or suggest new
        topics. Your feedback and expertise are invaluable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<GithubOutlined />}
        href="https://github.com/smswithoutborders/RelaySMS-System-Atlas"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ fontWeight: "bold", px: 4, py: 1.5, fontSize: "1rem" }}
      >
        Contribute on GitHub
      </Button>
    </Paper>
    <Typography variant="subtitle1" sx={{ color: "text.secondary", mt: 4 }}>
      💡 <b>Tip:</b> You can contribute by editing this documentation,
      submitting pull requests, or opening issues for missing or unclear
      sections.
    </Typography>
    <Typography variant="body2" sx={{ mt: 2, color: "text.disabled", mb: 4 }}>
      RelaySMS is open-source and community-driven. Thank you for helping us
      make offline messaging accessible to all!
    </Typography>
  </Box>
);

export default Contribution;
