import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const FooterComp = () => {
  return (
    <Box component="footer" sx={{ py: 4, px: 2, textAlign: "center" }}>
      <Divider />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        &copy; {new Date().getFullYear()} SMSWithoutBorders. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default FooterComp;
