import React, { Suspense } from "react";
import PropTypes from "prop-types";

import { FooterBar } from "../Dashboard/components";
import { Outlet } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "red",
  },
  content: {
    height: "100%",
    paddingTop: 56,
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
}));

const Auth = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          <Outlet />
        </Suspense>
      </main>
      <FooterBar />
    </div>
  );
};

Auth.propTypes = {
  route: PropTypes.object,
};

export default Auth;
