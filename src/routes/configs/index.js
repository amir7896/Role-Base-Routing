import * as admin from "./routes/roles/admin";
import * as m from "./routes/roles/manager";
import * as f from "./routes/roles/finance";
import * as auth from "./routes/auth";
import * as error from "./routes/errors";
import layouts from "./layout.configs";

import navigation from "./navigation/navigation.configs";

const index = [
  admin.configs,
  m.configs,
  f.configs,
  auth.configs,
  error.configs,
];

const views = {
  ...admin.views,
  ...m.views,
  ...f.views,
  ...auth.views,
  ...error.views,
};

export { views, layouts, navigation };

export default index;
