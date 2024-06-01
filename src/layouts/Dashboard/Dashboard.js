import React, { Suspense, useState } from "react";
import PropTypes from "prop-types";

import { Typography, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Outlet } from "react-router-dom";
import { NavBar, TopBar, FooterBar } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "white",
  },
  topBar: {
    zIndex: 2,
    position: "relative",
  },
  container: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: "0 0 auto",
  },
  content: {
    marginTop: 65,
    marginLeft: 10,
  },
}));

const Dashboard = ({ navigation }) => {
  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <div className={classes.root}>
      <TopBar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
          navigation={navigation}
        />
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <FooterBar />
    </div>
  );
};

Dashboard.propTypes = {
  route: PropTypes.object,
};

export default Dashboard;
