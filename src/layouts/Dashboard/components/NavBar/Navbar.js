import {
  Typography,
  Button,
  Toolbar,
  Hidden,
  Paper,
  Drawer,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import clsx from "clsx";
import { Navigation } from "../../../../components";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "282px",
    overflowY: "auto",
  },
  content: {
    padding: "10px",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    border: "0.1px solid #9E9E9E",
  },
  name: {
    marginTop: "10px",
  },
  divider: {
    marginTop: "10px",
  },
  navigation: {
    marginTop: "10px",
  },
  navbar: {
    width: "248px",
    paddingRight: "10px",
  },
}));

const NavBar = (props) => {
  const { openMobile, onMobileClose, className, navigation, ...rest } = props;

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
  }, [location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <Avatar
          alt="Vendor"
          className={classes.avatar}
          component={RouterLink}
          to="/profile/1/timeline"
        >
          {/* <img src={session.user.avatar} /> */}
        </Avatar>
      </div>
      {/* <Divider className={classes.divider} /> */}
      <nav className={classes.navigation}>
        <Navigation
          className={classes.navbar}
          component="div"
          config={navigation || []}
        />
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div {...rest} className={clsx(classes.root, className)}>
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
