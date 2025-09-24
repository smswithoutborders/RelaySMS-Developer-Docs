import React from "react";
import { Button } from "@mui/material";

const ButtonContained = ({ text, linkTo, onClick, fontSize }) => {
  return (
    <Button
      onClick={onClick || (() => window.open(linkTo, "_blank"))}
      fullWidth
      variant="contained"
      size="large"
      className="header"
      sx={{ p: 2, textTransform: "none", fontSize: { fontSize } }}
    >
      {text}
    </Button>
  );
};

export default ButtonContained;
