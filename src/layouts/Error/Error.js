import React, { Suspense } from "react";
import PropTypes from "prop-types";

import { Typography, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Outlet } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const Error = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

Error.propTypes = {
  route: PropTypes.object,
};

export default Error;
