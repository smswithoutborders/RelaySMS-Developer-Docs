import React from "react";
import { Box, Button } from "@mui/material";

const ButtonContained = ({ text, linkTo }) => {
  return (
    <Button
      onClick={() => window.open(linkTo,  "_self")}
      fullWidth
      variant="contained"
      size="large"
      sx={{ p: 1.5, textTransform: "none" }}
    >
      {text}
    </Button>
  );
};

export default ButtonContained;
