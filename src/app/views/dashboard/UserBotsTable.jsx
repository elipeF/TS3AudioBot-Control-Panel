import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  startBotAndReloadBots,
  startBotsAndReloadBots,
  stopBotAndReloadBots,
  stopBotsAndReloadBots,
} from "app/redux/actions/BotSettingsActions";
import { connect } from "react-redux";
import TransferBotModal from "./TransferBotModal";
import RemoveBotModal from "./RemoveBotModal";
import AdvanceTable from "app/ui/AdvanceTable";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";

const UserBotsTable = (props) => {
  const [openTransferModel, setOpenTransferModel] = useState(false);
  const [openRemoveModel, setOpenRemoveModel] = useState(false);
  const [botId, setBotId] = useState("");

  const history = useHistory();

  const { t } = useTranslation();

  const statusColor = (status) => {
    if (status === 2) {
      return "green";
    } else if (status === 1) {
      return "secondary";
    }
    return "error";
  };

  const statusCodeToName = (status) => {
    if (status === 2) {
      return "online";
    } else if (status === 1) {
      return "disconnected";
    }
    return "offline";
  };

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

  let adminActions = [];

  const startAll = () => {
    const bots = props.data.filter((e) => e.status === 0).map((e) => e.id);

    props.onStartBots(bots);
  };

  const stopAll = () => {
    const bots = props.data.filter((e) => e.status !== 0).map((e) => e.id);
    props.onStopBots(bots);
  };

  if (props.user.role === "admin") {
    adminActions.push(
      {
        icon: "delete",
        tooltip: t("bot.remove"),
        onClick: (event, rowData) => {
          setBotId(rowData.id);
          setOpenRemoveModel(!openRemoveModel);
        },
      },
      {
        icon: "import_export",
        tooltip: t("bot.transfer"),
        onClick: (event, rowData) => {
          setBotId(rowData.id);
          setOpenTransferModel(!openTransferModel);
        },
      }
    );
  }

  let columns = [
    {
      title: t("bot.status"),
      field: "status",
      render: (rowData) => {
        return (
          <div className="flex items-center">
            <div
              className={`ml-3 small-circle bg-${statusColor(
                rowData.status
              )} text-white`}
            ></div>
            <span
              className={`text-13 text-${statusColor(rowData.status)} ml-1`}
            >
              {statusCodeToName(rowData.status)}
            </span>
          </div>
        );
      },
    },
    { title: t("bot.name"), field: "name" },
    { title: t("bot.server"), field: "address" },
  ];

  return (
    <Fragment>
      {openTransferModel ? (
        <TransferBotModal
          botId={botId}
          open={openTransferModel}
          handleClose={() => setOpenTransferModel(!openTransferModel)}
        />
      ) : null}
      {openRemoveModel ? (
        <RemoveBotModal
          botId={botId}
          open={openRemoveModel}
          handleClose={() => setOpenRemoveModel(!openRemoveModel)}
        />
      ) : null}
      <div className="flex items-center">
        <h2>{t("my-bots")}</h2>
        <div className="ml-3">
          <Button
            variant="outlined"
            style={{
              color: "#08ad6c",
              border: "1px solid rgba(8, 173, 108, 0.5)",
            }}
            onClick={() => startAll()}
          >
            {t("start-all")}
          </Button>
        </div>
        <div className="ml-3">
          <Button
            variant="outlined"
            style={{
              color: "#f44336",
              border: "1px solid rgba(244, 67, 54, 0.5)",
            }}
            onClick={() => stopAll()}
          >
            {t("stop-all")}
          </Button>
        </div>
      </div>
      <div className="overflow-auto">
        <AdvanceTable
          title={""}
          columns={columns}
          data={props.data}
          actions={[
            ...adminActions,
            {
              icon: "settings",
              tooltip: t("bot.settings"),
              onClick: (event, rowData) => {
                history.push(`/bot/${rowData.id}/edit`);
              },
            },
            {
              icon: "power_settings_new",
              tooltip: t("bot.power"),
              onClick: (event, rowData) =>
                handlePowerOnOff(rowData.id, rowData.status),
            },
          ]}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartBot: (id) => dispatch(startBotAndReloadBots(id)),
    onStopBot: (id) => dispatch(stopBotAndReloadBots(id)),
    onStartBots: (ids) => dispatch(startBotsAndReloadBots(ids)),
    onStopBots: (ids) => dispatch(stopBotsAndReloadBots(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBotsTable);
