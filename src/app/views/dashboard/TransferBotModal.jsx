import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  NativeSelect,
} from "@material-ui/core";
import { transferBot } from "app/redux/actions/BotSettingsActions";
import { getUsersList } from "app/redux/actions/UsersActions";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

class TransferBotModal extends Component {
  state = {
    uuid: this.props.user.userId,
  };

  componentDidMount() {
    this.props.onUsersFetch();
  }

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{t("bot.transfer")}</DialogTitle>
        <DialogContent>
          {this.props.loading ? (
            <CircularProgress />
          ) : (
            <NativeSelect
              fullWidth
              autoFocus
              value={this.state.uuid}
              onChange={this.handleChange}
              name="uuid"
              inputProps={{ "aria-label": "text" }}
            >
              {this.props.users.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.username}
                </option>
              ))}
            </NativeSelect>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => this.props.handleClose()}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              this.props.onOwnerChange(this.props.botId, this.state.uuid);
              this.props.handleClose();
            }}
            color="primary"
          >
            {t("submit")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users.users,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersFetch: () => dispatch(getUsersList()),
    onOwnerChange: (botId, userId) => dispatch(transferBot(botId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(TransferBotModal));
