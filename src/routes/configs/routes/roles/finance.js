import { USER_ROLES } from "../../../../constants/AppContants";
import { lazy } from "react";
import * as r from "../../../constatns";

export const views = {
  [r.R_FINANCE]: lazy(() => import("../../../../views/Finanace")),
};

export const configs = {
  id: USER_ROLES.FINANCE,
  layout: "Dashboard",
  initialPath: "/",
  routes: Object.keys(views),
};
