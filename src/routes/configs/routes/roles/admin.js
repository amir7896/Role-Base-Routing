import { USER_ROLES } from "../../../../constants/AppContants";
import { lazy } from "react";
import * as r from "../../../constatns";

export const views = {
  [r.R_USERS]: lazy(() => import("../../../../views/Users")),
  [r.R_ANALYTICS]: lazy(() => import("../../../../views/Analytics")),
};

export const configs = {
  id: USER_ROLES.ADMIN,
  layout: "Dashboard",
  initialPath: r.R_ADMIN,
  routes: Object.keys(views),
};
