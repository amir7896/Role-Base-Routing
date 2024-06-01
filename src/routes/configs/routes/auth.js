import { lazy } from "react";
import * as r from "../../constatns";

export const views = {
  [r.R_LOGIN]: lazy(() => import("../../../views/Login")),
  [r.R_REGISTER]: lazy(() => import("../../../views/Register")),
};

export const configs = {
  id: "AUTH",
  layout: "clean",
  initialPath: r.R_AUTH,
  routes: Object.keys(views),
};
