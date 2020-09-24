import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { FormControlLabel, Switch } from "@material-ui/core";
import { addBotRights } from "app/redux/actions/BotRightsActions";
import { useTranslation } from "react-i18next";

function AddRightModel(props) {
  const [value, setValue] = useState("");
  const [admin, setAdmin] = useState(false);
  const { t } = useTranslation();

  let field = (
    <TextField
      autoFocus
      margin="dense"
      onChange={(e) => setValue(+e.target.value)}
      id={props.type}
      value={value}
      label="Groupid"
      type="number"
      fullWidth
    />
  );
  if (props.type === "useruid") {
    field = (
      <TextField
        autoFocus
        margin="dense"
        onChange={(e) => setValue(e.target.value)}
        id={props.type}
        value={value}
        label="Useruid"
        type="text"
        fullWidth
      />
    );
  }

  let adminField = null;
  if (props.user.role === "admin") {
    adminField = (
      <FormControlLabel
        control={
          <Switch
            checked={admin}
            onChange={() => setAdmin(!admin)}
            name="checkedB"
            color="primary"
          />
        }
        label="Admin"
      />
    );
  }

  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {props.type === "useruid" ? t("add-userid") : t("add-groupid")}
      </DialogTitle>
      <DialogContent>
        {field}
        {adminField}
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
            props.onAddRight(props.botId, { type: props.type, value, admin });
            props.handleClose();
          }}
          color="primary"
        >
          {t("submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (props) => {
  return {
    user: props.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddRight: (id, data) => dispatch(addBotRights(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRightModel);
