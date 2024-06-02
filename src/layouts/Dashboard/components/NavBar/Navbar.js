import { Hidden, Paper, Drawer, Avatar } from "@mui/material";
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
    padding: 7,
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
        <Avatar alt="Logo" className={classes.avatar} component={RouterLink}>
          <img
            style={{ objectFit: "contain" }}
            src={
              "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxvZ298ZW58MHx8MHx8fDA%3D"
            }
          />
        </Avatar>
      </div>
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
      <Hidden>
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
