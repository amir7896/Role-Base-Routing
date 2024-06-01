/* eslint-disable react/no-multi-comp */
import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Typography, List } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { NavigationListItem } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
  },
}));

const NavigationList = (props) => {
  const { config, ...rest } = props;
  return (
    <List>
      {config.reduce(
        (items, page) => reduceChildRoutes({ items, page, ...rest }),
        []
      )}
    </List>
  );
};

NavigationList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array,
};

const reduceChildRoutes = (props) => {
  const { location, items, page, depth } = props;

  if (page.children) {
    const open = matchPath(location.pathname, page.href);

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
      >
        <NavigationList
          depth={depth + 1}
          config={page.children}
          location={location}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />
    );
  }

  return items;
};

const Navigation = (props) => {
  const { title, config, className, component: Component, ...rest } = props;

  const classes = useStyles();
  const location = useLocation();

  return (
    <Component {...rest} className={clsx(classes.root, className)}>
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList depth={0} config={config} location={location} />
    </Component>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  config: PropTypes.array.isRequired,
  title: PropTypes.string,
};

Navigation.defaultProps = {
  component: "nav",
};

export default Navigation;
