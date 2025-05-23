import React from "react";
import { Box, Typography } from "@mui/material";

const BridgeServer = () => {
  return (
    <Box>
      <Box
        sx={{
          pt: { xs: 5, sm: 5, md: 5 },
          my: "auto",
          mx: { xs: 2, md: 4, sm: 4, lg: 4 },
        }}
      >
        <Typography variant="body2" wrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>

        <Typography variant="body2" wrap sx={{ pt: { md: 4, xs: 2 } }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Box>
      {/*  */}
    </Box>
  );
};

export default BridgeServer;
