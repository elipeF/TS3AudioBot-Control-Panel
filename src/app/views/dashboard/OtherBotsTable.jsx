import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  startBotAndReloadBots,
  startBotsAndReloadBots,
  stopBotAndReloadBots,
  stopBotsAndReloadBots,
} from "app/redux/actions/BotSettingsActions";
import { connect } from "react-redux";
import { getUsersList } from "app/redux/actions/UsersActions";
import TransferBotModal from "./TransferBotModal";
import RemoveBotModal from "./RemoveBotModal";
import Spinner from "../../ui/Spinner";
import AdvanceTable from "app/ui/AdvanceTable";
import { withTranslation } from "react-i18next";
import { Button } from "@material-ui/core";

class OtherBotsTable extends Component {
  state = {
    data: [],
    openTransferModel: false,
    openRemoveModel: false,
    usersParsing: true,
    botId: "",
  };

  statusColor = (status) => {
    if (status === 2) {
      return "green";
    } else if (status === 1) {
      return "secondary";
    }
    return "error";
  };

  statusCodeToName = (status) => {
    if (status === 2) {
      return "online";
    } else if (status === 1) {
      return "disconnected";
    }
    return "offline";
  };

  handlePowerOnOff = (id, status) => {
    switch (status) {
      case 0:
        return this.props.onStartBot(id);
      case 1:
        return this.props.onStopBot(id);
      case 2:
        return this.props.onStopBot(id);
      default:
        return null;
    }
  };

  handleModal(name, id) {
    this.setState((state) => {
      return {
        ...state,
        [name]: !state[name],
        botId: id,
      };
    });
  }

  startAll() {
    const bots = this.state.data.filter((e) => e.status === 0);

    this.props.onStartBots(bots);
  }

  stopAll() {
    const bots = this.state.data.filter((e) => e.status !== 0);
    this.props.onStopBots(bots);
  }

  componentDidMount() {
    this.props.onUsersFetch();
    this.setState({ ...this.state, usersParsing: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      if (!this.state.openTransferModel) {
        const newData = [];
        for (const el of this.props.data) {
          const findOwner = this.props.users.find((e) => el.owner === e._id);
          newData.push({
            ...el,
            owner: findOwner?.username ? findOwner.username : "unknow",
          });
        }
        this.setState({
          ...this.state,
          data: [...newData],
          usersParsing: false,
        });
      }
    }
  }

  render() {
    const { t } = this.props;
    let adminActions = [];
    if (this.props.user.role === "admin") {
      adminActions.push(
        {
          icon: "delete",
          tooltip: t("bot.remove"),
          onClick: (event, rowData) =>
            this.handleModal("openRemoveModel", rowData.id),
        },
        {
          icon: "import_export",
          tooltip: t("bot.transfer"),
          onClick: (event, rowData) =>
            this.handleModal("openTransferModel", rowData.id),
        }
      );
    }

    const columns = [
      {
        title: t("bot.status"),
        field: "status",
        render: (rowData) => {
          return (
            <div className="flex items-center">
              <div
                className={`ml-3 small-circle bg-${this.statusColor(
                  rowData.status
                )} text-white`}
              ></div>
              <span
                className={`text-13 text-${this.statusColor(
                  rowData.status
                )} ml-1`}
              >
                {this.statusCodeToName(rowData.status)}
              </span>
            </div>
          );
        },
      },
      { title: t("bot.name"), field: "name" },
      { title: t("bot.server"), field: "address" },
      { title: t("bot.owner"), field: "owner" },
    ];

    return (
      <Fragment>
        {this.state.usersParsing ? (
          <Spinner />
        ) : (
          <Fragment>
            {this.state.openTransferModel ? (
              <TransferBotModal
                botId={this.state.botId}
                open={this.state.openTransferModel}
                handleClose={() => this.handleModal("openTransferModel")}
              />
            ) : null}
            {this.state.openRemoveModel ? (
              <RemoveBotModal
                botId={this.state.botId}
                open={this.state.openRemoveModel}
                handleClose={() => this.handleModal("openRemoveModel")}
              />
            ) : null}
            <div className="flex items-center">
              <h2>{t("other-bots")}</h2>
              <div className="ml-3">
                <Button
                  variant="outlined"
                  style={{
                    color: "#08ad6c",
                    border: "1px solid rgba(8, 173, 108, 0.5)",
                  }}
                  onClick={() => this.startAll()}
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
                  onClick={() => this.stopAll()}
                >
                  {t("stop-all")}
                </Button>
              </div>
            </div>
            <div className="overflow-auto">
              <AdvanceTable
                title={""}
                columns={columns}
                data={this.state.data}
                actions={[
                  ...adminActions,
                  {
                    icon: "settings",
                    tooltip: t("bot.settings"),
                    onClick: (event, rowData) => {
                      this.props.history.push(`/bot/${rowData.id}/edit`);
                    },
                  },
                  {
                    icon: "power_settings_new",
                    tooltip: t("bot.power"),
                    onClick: (event, rowData) =>
                      this.handlePowerOnOff(rowData.id, rowData.status),
                  },
                ]}
              />
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartBot: (id) => dispatch(startBotAndReloadBots(id)),
    onStartBots: (ids) => dispatch(startBotsAndReloadBots(ids)),
    onStopBots: (ids) => dispatch(stopBotsAndReloadBots(ids)),
    onStopBot: (id) => dispatch(stopBotAndReloadBots(id)),
    onUsersFetch: () => dispatch(getUsersList()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(OtherBotsTable)));
