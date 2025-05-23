import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ButtonContained, ButtonOutline } from "../components";
import { ArrowRightOutlined, SwapRightOutlined } from "@ant-design/icons";

const Vault = () => {
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
          Vault
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
          pt: { xs: 4, sm: 6, md: 30 },
          my: "auto",
          alignContent: "center",
          textAlign: "center",
          mb: { xs: 6, md: 15, sm: 10, lg: 25 },
          mx: { xs: 2, md: 15, sm: 10, lg: 25 },
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          wrap="nowrap"
        >
          <Grid size={{ md: 3, xs: 6 }}>
            <ButtonContained text="Client" />
          </Grid>

          <Grid size={{ md: 1.5, xs: 6 }}>
            <SwapRightOutlined style={{ fontSize: 32, color: "grey.500" }} />
          </Grid>

          <Grid size={{ md: 3, xs: 6 }}>
            <ButtonContained text="Vault" />
          </Grid>

          <Grid size={{ md: 1.5, xs: 6 }}>
            <SwapRightOutlined style={{ fontSize: 32, color: "grey.500" }} />
          </Grid>

          <Grid size={{ md: 3, xs: 6 }}>
            <ButtonContained text="Publisher" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Vault;
