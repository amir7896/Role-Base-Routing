import ADMIN from "./roles/admin";
import FINANCE from "./roles/finance";
import MANAGER from "./roles/manager";

import { USER_ROLES } from "../../../constants/AppContants";

export default {
  [USER_ROLES.ADMIN]: ADMIN,
  [USER_ROLES.FINANCE]: FINANCE,
  [USER_ROLES.MANAGER]: MANAGER,
};
