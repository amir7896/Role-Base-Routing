import React, { useEffect, useRef, useState } from "react";

import {
  Hidden,
  Badge,
  colors,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { ExpandMoreOutlined, Menu, Notifications } from "@mui/icons-material";

import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";

import LocalStorage from "../../../../Managers/LocalStorage";
const TopBar = (props) => {
  const { onOpenNavBarMobile, className, ...rest } = props;
  const user = {
    userId: "0b9bc5bf-e1f3-47fe-94a7-c55c30077f35",
    email: "noor@gmail.com",
    roles: ["Admin"],
    username: "Noor",
  };

  const signout = () => {
    console.log("signout");
  };
  const dropDownRef = useRef(null);
  // const { swipeeUserId } = LocalStorage.getUser();
  const classes = useStyles();

  const [show, setShow] = useState([]);
  const [open, setOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showBadge, setshowBadge] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <RouterLink to="/">
          {/* <img alt="Logo" src="/images/logos/logo--white.png" /> */}
        </RouterLink>

        <div className={classes.flexGrow} />

        <Hidden mdDown>
          <div style={{ display: "flex", gap: 30 }}>
            <IconButton
              className={classes.notificationsButton}
              color="inherit"
              //   onClick={handleNotificationsOpen}
              //   ref={notificationsRef}
            >
              <Badge
                invisible={!showBadge}
                classes={{ badge: classes.notificationsBadge }}
                overlap="rectangular"
                variant="dot"
              >
                <Notifications />
              </Badge>
            </IconButton>

            <div
              ref={dropDownRef}
              className={classes.avatarMenu}
              onClick={() => setOpen(true)}
            >
              <Avatar alt="avatar" src={user?.profilePicture} />
              <div>
                <Typography variant="body1">{user?.username}</Typography>
                <Typography variant="body2">{user?.roles[0]}</Typography>
              </div>
              <ExpandMoreOutlined variant="contained" />
            </div>
          </div>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onOpenNavBarMobile}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  avatarMenu: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    cursor: "pointer",

    "& .MuiTypography-root": {
      textAlign: "center",
    },
    "& .MuiTypography-body1": {
      fontSize: "14px",
      color: "#FFC800",
    },
    "& .MuiTypography-body2": {
      fontSize: "12px",
      color: "#f4f6f8",
    },
  },

  root: {
    boxShadow: "none",
  },

  flexGrow: {
    flexGrow: 1,
  },

  notificationsButton: {
    marginLeft: "10px",
  },

  notificationsBadge: {
    backgroundColor: colors.orange[600],
  },
}));

export default TopBar;
