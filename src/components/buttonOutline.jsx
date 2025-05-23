import React from "react";
import { Box, Button } from "@mui/material";

const ButtonOutline = ({ text, linkTo }) => {
  return (
    <Button
      onClick={() => window.open(linkTo, "_self")}
      fullWidth
      variant="outlined"
      size="large"
      sx={{ p: 1.5, textTransform: "none" }}
    >
      {text}
    </Button>
  );
};

export default ButtonOutline;
