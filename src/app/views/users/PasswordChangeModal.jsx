import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@material-ui/core";
import { transferBot } from "app/redux/actions/BotSettingsActions";
import { getUsersList } from "app/redux/actions/UsersActions";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const TransferBotModal = (props) => {
  const [password, setPassword] = useState("");

  const { t } = useTranslation();

  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{t("pass-change")}</DialogTitle>
      <DialogContent>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => props.handleClose()}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={() => {
            console.log(password);
            props.handleClose();
          }}
          color="primary"
        >
          {t("submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(TransferBotModal);
