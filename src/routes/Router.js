import { isEmpty } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignIn from "../views/Login";
import * as r from "./constatns";
import RoutingManager from "./RoutingManager";
import { useAuth } from "../hooks/useAuth";

function Router(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [currentRouteIds, setCurrentRouteIds] = useState([]);

  useEffect(() => {
    if (user && user !== null) {
      setCurrentRouteIds(user.roles);
      RoutingManager.reRouteOnLogin(user?.roles, location, navigate);
    } else {
      setCurrentRouteIds(["AUTH"]);
      navigate(r.R_LOGIN);
    }
  }, [user]);

  // returning nothing before routes are generated
  if (isEmpty(currentRouteIds)) return null;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={r.R_LOGIN} />} />

      {user ? (
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
        <Route path={r.R_LOGIN} element={<SignIn />} />
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

      {/* Unatuhorized page */}
      {/* 
      {RoutingManager.getUnAuthorizedRoutes(user?.roles || []).map((path) => (
        <Route key={path} path={path} element={<Navigate to={r.R_E_401} />} />
      ))} */}

      {/* Page not found */}
      <Route path="*" element={<Navigate to={r.R_E_404} />} />
    </Routes>
  );
}

Router.propTypes = {};

export default Router;
