import React from "react";

const botRoutes = [
  {
    exact: true,
    path: "/bot/:id/edit",
    component: React.lazy(() => import("./Bot")),
  },
];

export default botRoutes;
