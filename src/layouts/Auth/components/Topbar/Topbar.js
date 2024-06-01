import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
  },
}));

const Topbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <RouterLink to="/"></RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
