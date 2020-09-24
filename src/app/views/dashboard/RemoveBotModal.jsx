import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { removeBot } from "app/redux/actions/BotSettingsActions";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const RemoveBotModal = (props) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{t("bot.remove")}</DialogTitle>
      <DialogContent></DialogContent>
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
            props.onBotRemove(props.botId);
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

const mapDispatchToProps = (dispatch) => {
  return {
    onBotRemove: (botId) => dispatch(removeBot(botId)),
  };
};

export default connect(null, mapDispatchToProps)(RemoveBotModal);
