import { CircularProgress } from "@material-ui/core";
import React from "react";

const Spinner = (props) => (
  <div className="flex items-center justify-center pb-5">
    <CircularProgress {...props} />
  </div>
);

export default Spinner;
