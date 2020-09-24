import React, { Component } from "react";
import { Grid, Card } from "@material-ui/core";
import { Button } from "@material-ui/core";
import SettingsFormBody from "./SettingsFormBody";
import { connect } from "react-redux";
import { getBot } from "app/redux/actions/BotSettingsActions";
import SettingsFormHeader from "./SettingFormHeader";
import { getBotRights } from "app/redux/actions/BotRightsActions";
import AddRightModel from "./AddRightModel";
import RightsTable from "./RightsTable";
import Spinner from "../../ui/Spinner";
import { withTranslation } from "react-i18next";

class Bot extends Component {
  state = {
    openUniqModel: false,
    openGroupModel: false,
  };

  componentDidMount() {
    this.props.onFetchBot(this.props.match.params.id);
    this.props.onFetchRights(this.props.match.params.id);
  }

  handleModelState = (key) => {
    this.setState((state) => {
      return {
        ...state,
        [key]: !state[key],
      };
    });
  };

  render() {
    const { t } = this.props;
    let settingsformbody = <Spinner />;
    if (!this.props.loadingSettings) {
      settingsformbody = <SettingsFormBody bot={this.props.botSettings} />;
    }
    return (
      <div className="analytics pt-25 m-sm-30 mt--18">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">
              <SettingsFormHeader
                botId={this.props.match.params.id}
                loading={this.props.loadingSettings}
                botStatus={
                  this.props.botSettings ? this.props.botSettings.status : 0
                }
              />
              {settingsformbody}
            </Card>
          </Grid>

          {this.state.openUniqModel ? (
            <AddRightModel
              open={this.state.openUniqModel}
              type={"useruid"}
              botId={this.props.match.params.id}
              handleClose={() => this.handleModelState("openUniqModel")}
            />
          ) : null}
          {this.state.openGroupModel ? (
            <AddRightModel
              open={this.state.openGroupModel}
              type={"groupid"}
              botId={this.props.match.params.id}
              handleClose={() => this.handleModelState("openGroupModel")}
            />
          ) : null}

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">
              <div className="flex items-center">
                <h4 className="m-0 flex-grow">{t("users")}</h4>
                <span className="text-13 text-muted ml-1">
                  {this.props.useruid.length}
                </span>
              </div>
              {this.props.loadingRights ? (
                <Spinner />
              ) : (
                <RightsTable
                  botId={this.props.match.params.id}
                  type={"useruid"}
                  data={this.props.useruid}
                />
              )}
              <div className="pt-5">
                <Button
                  onClick={() => this.handleModelState("openUniqModel")}
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                >
                  {t("add")}
                </Button>
              </div>
            </Card>
            <Card className="px-6 py-4 mb-6">
              <div className="flex items-center">
                <h4 className="m-0 flex-grow">{t("groups")}</h4>
                <span className="text-13 text-muted ml-1">
                  {this.props.groupid.length}
                </span>
              </div>
              {this.props.loadingRights ? (
                <Spinner />
              ) : (
                <RightsTable
                  botId={this.props.match.params.id}
                  type={"groupid"}
                  data={this.props.groupid}
                />
              )}
              <div className="pt-5">
                <Button
                  onClick={() => this.handleModelState("openGroupModel")}
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                >
                  {t("add")}
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    botSettings: state.botSettings.bot,
    loadingSettings: state.botSettings.loading,
    useruid: state.botRights.useruid,
    groupid: state.botRights.groupid,
    loadingRights: state.botRights.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBot: (id) => dispatch(getBot(id)),
    onFetchRights: (id) => dispatch(getBotRights(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Bot));
