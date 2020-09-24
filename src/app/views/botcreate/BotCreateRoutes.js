import React from "react";
import { authRoles } from "../../auth/authRoles";

const botCreateRoutes = [
  {
    exact: true,
    path: "/createbot",
    component: React.lazy(() => import("./BotCreate")),
    auth: authRoles.admin,
  },
];

export default botCreateRoutes;
