import { Button, CircularProgress, Icon } from "@material-ui/core";
import React from "react";

const BlockButton = (props) => {
  return (
    <div className="flex flex-wrap items-center mb-4">
      <div style={{ position: "relative" }}>
        <Button
          {...(props.loading ? { disabled: true } : {})}
          color="primary"
          variant="contained"
          type="submit"
          onClick={props.onClick}
        >
          <Icon>send</Icon>
          <span className="pl-2 capitalize">{props.text}</span>
        </Button>
        {props.loading ? (
          <CircularProgress
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -12,
              marginLeft: -12,
            }}
            size={24}
            color="secondary"
          />
        ) : null}
      </div>
    </div>
  );
};

export default BlockButton;
