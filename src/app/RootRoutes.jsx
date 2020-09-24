import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import botRoutes from "./views/bot/BotRoutes";
import botCreateRoutes from "./views/botcreate/BotCreateRoutes";
import usersRoutes from "./views/users/UsersRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...botRoutes,
  ...botCreateRoutes,
  ...usersRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
