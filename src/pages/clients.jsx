import React from "react";
import { Box, Typography } from "@mui/material";

const Clients = () => {
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

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            pt: 5,
          }}
          className="header"
        >
          . Andriod
        </Typography>
        <Typography variant="body2" sx={{ py: { md: 2, xs: 2 } }} wrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body2" sx={{ pt: { md: 2, xs: 2 } }} wrap>
          <span style={{ fontWeight: "bold" }}>Download:</span>{" "}
          <a
            style={{ color: "#59C8FF" }}
            href="https://play.google.com/store/apps/details?id=com.relaysms.android&hl=en&gl=US"
          >
            {" "}
            Github{" "}
          </a>
          <a
            style={{ color: "#59C8FF" }}
            href="https://play.google.com/store/apps/details?id=com.relaysms.android&hl=en&gl=US"
          >
            {" "}
            PlayStore{" "}
          </a>
        </Typography>
        <Typography variant="body2" sx={{ py: { md: 2, xs: 2 } }} wrap>
          <span style={{ fontWeight: "bold" }}>Contribute:</span>{" "}
          <a
            style={{ color: "#59C8FF" }}
            href="https://play.google.com/store/apps/details?id=com.relaysms.android&hl=en&gl=US"
          >
            Github{" "}
          </a>
        </Typography>
        {/*  */}
          <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            pt: 5,
          }}
          className="header"
        >
          . IOS
        </Typography>
        <Typography variant="body2" sx={{ py: { md: 2, xs: 2 } }} wrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body2" sx={{ pt: { md: 2, xs: 2 } }} wrap>
          <span style={{ fontWeight: "bold" }}>Download:</span>{" "}
          <a
            style={{ color: "#59C8FF" }}
            href="https://play.google.com/store/apps/details?id=com.relaysms.android&hl=en&gl=US"
          >
            {" "}
            Github{" "}
          </a>
          <a
            style={{ color: "#59C8FF" }}
            href="https://play.google.com/store/apps/details?id=com.relaysms.android&hl=en&gl=US"
          >
            {" "}
            PlayStore{" "}
          </a>
        </Typography>
        <Typography variant="body2" sx={{ py: { md: 2, xs: 2 } }} wrap>
          <span style={{ fontWeight: "bold" }}>Contribute:</span>{" "}
          <a
            style={{ color: "#59C8FF" }}
            href="https://play.google.com/store/apps/details?id=com.relaysms.android&hl=en&gl=US"
          >
            Github{" "}
          </a>
        </Typography>
       
      </Box>
      {/*  */}
    </Box>
  );
};

export default Clients;
