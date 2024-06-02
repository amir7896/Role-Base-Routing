import { Typography, Toolbar } from "@mui/material";

import React from "react";

const FooterBar = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Toolbar
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#37474f",
      }}
    >
      <div style={{ flex: 1, textAlign: "center" }}>
        <Typography
          sx={{ fontWeight: 400, fontSize: 16, color: "#e0e0e0" }}
          variant="body1"
        >
          &copy; {currentYear}. All Rights Reserved
        </Typography>
      </div>
    </Toolbar>
  );
};

export default FooterBar;
