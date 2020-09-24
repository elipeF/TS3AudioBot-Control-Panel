import React from "react";

const dashboardRoutes = [
  {
    exact: true,
    path: "/dashboard",
    component: React.lazy(() => import("./Analytics")),
  },
];

export default dashboardRoutes;
