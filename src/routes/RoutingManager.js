import { USER_ROLES } from "../constants/AppContants";
import { difference, isArray, uniq } from "lodash";
import { matchPath } from "react-router-dom";
import configs, { layouts, navigation, views } from "./configs";
import * as r from "./constatns";

class RoutingManager {
  static singleton = new RoutingManager();
  #configs = configs;
  #views = views;
  #layouts = layouts;
  #navigation = navigation;

  constructor() {
    if (RoutingManager.singleton != null) {
      return RoutingManager.singleton;
    }
  }

  getInitialRouteForRole(role) {
    const initialPaths = {
      [USER_ROLES.ADMIN]: r.R_USERS,
      [USER_ROLES.MANAGER]: r.R_MANAGER,
      [USER_ROLES.FINANCE]: r.R_FINANCE,
    };

    return initialPaths[role];
  }

  reRouteOnLogin(roles, location, navigate) {
    const match = matchPath(location.pathname, r.R_LOGIN);
    console.log("match ====>:", match);
    if (match) navigate(this.getInitialRouteForRole(roles[0]));
  }

  currentSideNavConfigs(roles = []) {
    if (isArray(roles) && !(roles[0] in this.#navigation)) return [];
    return this.#navigation[roles[0]];
  }

  getUnAuthorizedRoutes(currentRoles) {
    if (!isArray(currentRoles)) return;

    return difference(
      uniq(
        this.getRoutesBasedOnRoles(
          Object.values(USER_ROLES).filter(
            (role) => !currentRoles.includes(role)
          )
        ).flat()
      ),
      uniq(
        this.getRoutesBasedOnRoles(
          Object.values(USER_ROLES).filter((role) =>
            currentRoles.includes(role)
          )
        ).flat()
      )
    );
  }

  getConfigsBasedOnRole(roles = []) {
    return this.#configs.filter((config) => roles.includes(config.id));
  }

  getRoutesBasedOnRoles(roles = []) {
    const res = this.getConfigsBasedOnRole(roles).map((ele) => ele.routes);
    console.log("getRoutesBasedOnRoles ====>", res);
    return this.getConfigsBasedOnRole(roles).map((ele) => ele.routes);
  }

  getLayoutById(layoutId) {
    if (!(layoutId in this.#layouts)) return;
    console.log("Layout by id =====>", this.#layouts[layoutId]);

    return this.#layouts[layoutId];
  }

  mapViewsToRoutes(_routes) {
    const mappedRoutes = [];
    _routes.forEach((route) => {
      if (!(route in this.#views)) return;

      mappedRoutes.push({
        path: route,
        Component: this.#views[route],
      });
    });

    console.log("Mapped routes ====>", mappedRoutes);

    return mappedRoutes;
  }

  generateRoutes(roles) {
    const generatedRoutes = [];
    this.getConfigsBasedOnRole([...roles, "ERROR"]).forEach((config) => {
      const index = generatedRoutes.findIndex(
        (route) => route.path === config.initialPath
      );
      if (index !== -1) {
        generatedRoutes[index].routes.push(
          ...this.mapViewsToRoutes(config.routes)
        );
      } else {
        generatedRoutes.push({
          path: config.initialPath,
          Component: this.getLayoutById(config.layout),
          routes: this.mapViewsToRoutes(config.routes),
        });
      }
    });
    console.log("Generated routes ====>", generatedRoutes);

    return generatedRoutes;
  }
}

export default RoutingManager.singleton;
