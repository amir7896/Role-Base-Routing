import { lazy } from "react";
import * as r from "../../constatns";

export const views = {
  [r.R_E_404]: lazy(() => import("../../../views/Error404")),
};

export const configs = {
  id: "ERROR",
  layout: "error",
  initialPath: r.R_E,
  routes: Object.keys(views),
};
