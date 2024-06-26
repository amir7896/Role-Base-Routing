/* eslint-disable react/display-name */
import React, { useState, forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Collapse, colors, Button, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { ExpandMore, ExpandLess } from "@mui/icons-material";

const CustomRouterLink = forwardRef((props, ref) => {
  const { activeClassName, className } = props;

  const customProps = { ...props };
  customProps.className = ({ isActive }) =>
    isActive ? `${className} ${activeClassName}` : className;
  delete customProps.activeClassName;
  delete customProps.exact;

  return (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...customProps} />
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  buttonLeaf: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: "bold",
    "&.depth-0": {
      fontWeight: "bold",
    },
  },
  icon: {
    color: "white",
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },
  expandIcon: {
    marginLeft: "auto",
    height: 16,
    width: 16,
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  active: {
    color: "gray",
    background: "#F5F5F5",
    fontWeight: "bolder",
    "& $icon": {
      color: "gray",
    },
  },
}));

const NavigationListItem = (props) => {
  const {
    title,
    href,
    depth,
    children,
    icon: Icon,
    className,
    open: openProp,
    label: Label,
    ...rest
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((open) => !open);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = {
    paddingLeft,
  };

  if (children) {
    return (
      <ListItem
        {...rest}
        className={clsx(classes.item, className)}
        disableGutters
      >
        <Button className={classes.button} onClick={handleToggle} style={style}>
          {Icon && <Icon className={classes.icon} />}
          {title}
          {open ? (
            <ExpandLess className={classes.expandIcon} color="inherit" />
          ) : (
            <ExpandMore className={classes.expandIcon} color="inherit" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        {...rest}
        className={clsx(classes.itemLeaf, className)}
        disableGutters
      >
        <Button
          activeClassName={classes.active}
          className={clsx(classes.buttonLeaf, `depth-${depth}`)}
          component={CustomRouterLink}
          exact
          style={style}
          to={href}
        >
          {Icon && <Icon className={classes.icon} />}
          {title}
          {Label && (
            <span className={classes.label}>
              <Label />
            </span>
          )}
        </Button>
      </ListItem>
    );
  }
};

NavigationListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavigationListItem.defaultProps = {
  depth: 0,
  open: false,
};

export default NavigationListItem;
