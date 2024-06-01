import { USER_ROLES } from "../../../../constants/AppContants";
import { lazy } from "react";
import * as r from "../../../constatns";

export const views = {
  [r.R_EMPLOYESS]: lazy(() => import("../../../../views/Employee")),
};

export const configs = {
  id: USER_ROLES.MANAGER,
  layout: "Dashboard",
  initialPath: "/",
  routes: Object.keys(views),
};
