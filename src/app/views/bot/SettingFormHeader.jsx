import { Button, Icon, IconButton } from "@material-ui/core";
import {
  startBotAndReloadBot,
  stopBotAndReloadBot,
} from "app/redux/actions/BotSettingsActions";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Spinner from "../../ui/Spinner";

const SettingsFormHeader = (props) => {
  const { t } = useTranslation();
  let style = {};
  let status = "UNKNOW";
  switch (props.botStatus) {
    case 0:
      status = "OFFLINE";
      style = {
        color: "#f44336 ",
        border: "1px solid rgba(244, 67, 54, 0.5)",
      };
      break;
    case 2:
      style = {
        color: "#08ad6c ",
        border: "1px solid rgba(8, 173, 108, 0.5)",
      };
      status = "ONLINE";
      break;
    case 1:
      status = "DISCONNECTED";
      style = {
        color: "#ff9e43 ",
        border: "1px solid rgba(255, 158, 67, 0.5)",
      };
      break;
    default:
      return style;
  }

  const handlePowerOnOff = (id, status) => {
    switch (status) {
      case 0:
        return props.onStartBot(id);
      case 1:
        return props.onStopBot(id);
      case 2:
        return props.onStopBot(id);
      default:
        return true;
    }
  };

  let controls = (
    <div className="ml-3">
      <Button disabled variant="outlined" style={style}>
        {status}
      </Button>
      <IconButton
        onClick={() => handlePowerOnOff(props.botId, props.botStatus)}
        aria-label="Delete"
      >
        <Icon>power_settings_new</Icon>
      </IconButton>
    </div>
  );
  if (props.loading) {
    controls = (
      <div className="ml-3">
        <Spinner />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex items-center mb-4">
        <h2 className="m-0 flex-grow">{t("bot-settings-title")}</h2>
        {controls}
      </div>
      <h6 className="text-muted mb-4">Bot ID: {props.botId}</h6>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartBot: (id) => dispatch(startBotAndReloadBot(id)),
    onStopBot: (id) => dispatch(stopBotAndReloadBot(id)),
  };
};

export default connect(null, mapDispatchToProps)(SettingsFormHeader);
