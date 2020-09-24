import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  NativeSelect,
} from "@material-ui/core";
import { getBotsList } from "app/redux/actions/BotsActions";
import {
  removeUser,
  removeUserWithBotDelete,
  removeUserWithBotMigrate,
} from "app/redux/actions/UserRemoveActions";
import { getUsersList } from "app/redux/actions/UsersActions";
import Spinner from "app/ui/Spinner";
import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

class RemoveUserModal extends Component {
  state = {
    uuid: this.props.user.userId,
    loading: true,
    botCount: 0,
    transfer: false,
    remove: false,
  };

  componentDidMount() {
    this.props.onBotsFetch();
    this.props.onUsersFetch();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.bots !== this.props.bots) {
      const filter = this.props.bots.filter(
        (e) => e.owner === this.props.userId
      );
      this.setState({ loading: false, botCount: filter.length });
    }
  }
  handleChange = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleTransfer = (event) => {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  submit() {
    if (this.state.transfer) {
      this.props.onUserRemoveWithBotsMigrate(
        this.props.userId,
        this.state.uuid
      );
      return this.props.handleClose();
    }
    if (this.state.remove) {
      this.props.onUserRemoveWithBotsDelete(this.props.userId);
      return this.props.handleClose();
    }

    this.props.onUserRemove(this.props.userId);
    return this.props.handleClose();
  }

  render() {
    const { t } = this.props;
    let form = null;
    if (this.state.botCount > 0) {
      form = (
        <Fragment>
          <FormControl required component="fieldset">
            <FormLabel component="legend">
              {t("user-remove-modal.question")}
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.transfer}
                    onChange={this.handleChange("transfer")}
                    value="transfer"
                  />
                }
                label={t("user-remove-modal.transfer")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.remove}
                    onChange={this.handleChange("remove")}
                    value="remove"
                  />
                }
                label={t("user-remove-modal.remove")}
              />
            </FormGroup>
            <FormHelperText>
              {t("user-remove-modal.options.noaction")}
            </FormHelperText>
          </FormControl>
        </Fragment>
      );
    } else {
      form = t("user-remove-modal.options.default");
    }
    if (this.state.transfer) {
      if (this.props.loading) {
        form = <Spinner />;
      } else {
        form = (
          <Fragment>
            <div>{t("user-remove-modal.options.transfer")}</div>
            <NativeSelect
              fullWidth
              autoFocus
              value={this.state.uuid}
              onChange={this.handleTransfer}
              name="uuid"
              inputProps={{ "aria-label": "text" }}
            >
              {this.props.users.map((e) => (
                <option value={e._id}>{e.username}</option>
              ))}
              ;
            </NativeSelect>
          </Fragment>
        );
      }
    }

    if (this.state.remove) {
      form = t("user-remove-modal.options.remove");
    }

    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {t("user-remove-modal.title")}
        </DialogTitle>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <DialogContent> {form} </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => this.props.handleClose()}
              >
                {t("cancel")}
              </Button>
              <Button onClick={() => this.submit()} color="primary">
                {t("submit")}
              </Button>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bots: state.bots.bots,
    user: state.user,
    users: state.users.users,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserRemove: (userId) => dispatch(removeUser(userId)),
    onUserRemoveWithBotsMigrate: (userId, target) =>
      dispatch(removeUserWithBotMigrate(userId, target)),
    onUserRemoveWithBotsDelete: (userId) =>
      dispatch(removeUserWithBotDelete(userId)),
    onBotsFetch: () => dispatch(getBotsList()),
    onUsersFetch: () => dispatch(getUsersList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(RemoveUserModal));
