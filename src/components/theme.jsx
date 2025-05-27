// theme.js
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#FF9E43",
      secondary: "#",
    },
    ...(mode === "light"
      ? {
          background: {
            default: "#FFF7F0",
            paper: "#ffffff",
          },
        }
      : {
          background: {
            default: "#121212",
            paper: "#000000",
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: ({ theme }) => ({
            color: theme.palette.mode === "light" ? "#000" : "#ccc",
            borderColor: theme.palette.mode === "light" ? "#000" : "#777",
            "&:hover": {
              borderColor: theme.palette.mode === "light" ? "#000" : "#999",
              backgroundColor:
                theme.palette.mode === "light" ? "#f5f5f5" : "#1e1e1e",
            },
          }),
        },
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#FF9E43",
            color: "#000",
            "&:hover": {
              backgroundColor: "#ffa74d",
            },
          },
        },
      ],
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
