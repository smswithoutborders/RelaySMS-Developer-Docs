import React from "react";
import { Button } from "@mui/material";

const ButtonContained = ({ text, linkTo, onClick, fontSize }) => {
  return (
    <Button
      onClick={onClick || (() => window.open(linkTo, "_self"))}
      fullWidth
      variant="contained"
      size="large"
      sx={{ p: 2, textTransform: "none", fontSize: {fontSize}, fontWeight: "bold" }}
    >
      {text}
    </Button>
  );
};

export default ButtonContained;
