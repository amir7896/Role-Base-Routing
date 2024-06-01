import { Typography, Button, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 46,
    backgroundColor: "#37474f",
  },
  text1: {
    fontWeight: 400,
    fontSize: 14,
    color: "#e0e0e0",
  },
  text: {
    fontWeight: 400,
    fontSize: 14,
    color: "#e0e0e0",
  },
}));

const FooterBar = () => {
  const classes = useStyles();

  const currentYear = new Date().getFullYear();

  return (
    <Toolbar className={classes.container}>
      <div style={{ flex: 1 }} />
      <div style={{ flex: 1, textAlign: "center" }}>
        <Typography className={classes.text1} variant="body1">
          &copy; {currentYear}. All rights Reserved
        </Typography>
      </div>

      <div style={{ flex: 1, textAlign: "right" }}>
        <Button className={classes.text}>Terms & Conditions</Button>
        <Button className={classes.text}>Privacy Policy</Button>
      </div>
    </Toolbar>
  );
};

export default FooterBar;
