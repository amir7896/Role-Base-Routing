import { USER_ROLES } from "../../../../constants/AppContants";
import { lazy } from "react";
import * as r from "../../../constatns";

export const views = {
  [r.R_FINANCE_LIST]: lazy(() => import("../../../../views/Finanace")),
};

export const configs = {
  id: USER_ROLES.FINANCE,
  layout: "Dashboard",
  initialPath: r.R_FINANCE,
  routes: Object.keys(views),
};
