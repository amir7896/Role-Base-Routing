import { isEmpty } from "lodash";
import LocalStorage from "../Managers/LocalStorage";
import React, { Fragment, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignInVendor from "../views/Login";
import * as r from "./constatns";
import RoutingManager from "./RoutingManager";

function Router(props) {
  const navigate = useNavigate();
  const location = useLocation();
  //   const { user, isLoggedIn } = useAuth();
  const user = {
    name: "amir ali",
    email: "amir@gmail.com",
    id: 1,
    roles: ["Manager"],
  };
  const isLoggedIn = () => {
    return user !== null;
  };
  const [currentRouteIds, setCurrentRouteIds] = useState([]);

  useEffect(() => {
    if (isLoggedIn()) {
      setCurrentRouteIds(user.roles);
      RoutingManager.reRouteOnLogin(user.roles, location, navigate);
    } else {
      setCurrentRouteIds(["AUTH"]);
      if (LocalStorage.get("isLoggingOut")) {
        LocalStorage.remove("isLoggingOut");
        navigate(r.R_LOGIN);
      }
    }
  }, []);

  // returning nothing before routes are generated
  if (isEmpty(currentRouteIds)) return null;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={r.R_LOGIN} />} />

      {isLoggedIn() ? (
        <Fragment>
          <Route
            path={r.R_LOGIN}
            element={
              <Navigate
                to={RoutingManager.getInitialRouteForRole(user.roles[0])}
              />
            }
          />
          <Route
            path={r.R_LOGIN}
            element={
              <Navigate
                to={RoutingManager.getInitialRouteForRole(user.roles[0])}
              />
            }
          />
        </Fragment>
      ) : (
        <Route path={r.R_LOGIN} element={<SignInVendor />} />
      )}

      {RoutingManager.generateRoutes(currentRouteIds).map(
        ({ path, Component, routes }) => (
          <Route
            key={path}
            path={path}
            element={
              <Component
                navigation={RoutingManager.currentSideNavConfigs(
                  user?.roles || []
                )}
              />
            }
          >
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        )
      )}
      {/* 
      {RoutingManager.getUnAuthorizedRoutes(user?.roles || []).map((path) => (
        <Route key={path} path={path} element={<Navigate to={r.R_E_401} />} />
      ))} */}

      <Route path="*" element={<Navigate to={r.R_E_404} />} />
    </Routes>
  );
}

Router.propTypes = {};

export default Router;
