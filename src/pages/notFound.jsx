import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ height: { xs: "auto", md: "88vh" } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
            fontWeight: "bold",
            color: "primary.main",
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            fontWeight: "600",
            mb: 2,
            color: "text.primary",
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "text.secondary",
            mb: 4,
            maxWidth: "600px",
            lineHeight: 1.6,
          }}
        >
          Sorry, the page you are looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeOutlined />}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
