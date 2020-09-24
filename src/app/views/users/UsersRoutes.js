import React from "react";
import { authRoles } from "../../auth/authRoles";

const usersRoutes = [
  {
    exact: true,
    path: "/users",
    component: React.lazy(() => import("./Users")),
    auth: authRoles.admin,
  },
];

export default usersRoutes;
