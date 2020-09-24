import React, { Component } from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { editBot } from "app/redux/actions/BotSettingsActions";
import { withTranslation } from "react-i18next";

class SettingsFormBody extends Component {
  typingTimer = null;

  state = {
    address: "",
    name: "",
    language: "",
    channel: 0,
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      address: this.props.bot.address,
      name: this.props.bot.name,
      language: this.props.bot.language,
      channel: this.props.bot.channel,
    });
  }

  handleChange = (event) => {
    event.persist();
    if (event.target.type === "checkbox") {
      this.setState((prevState) => {
        return {
          ...prevState,
          [event.target.name]: !prevState[event.target.name],
        };
      });
    } else {
      this.setState({ ...this.state, [event.target.name]: event.target.value });
    }
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      if (event.target.value) {
        this.send(event.target.name);
      }
    }, 1000);
  };

  send(event) {
    if (this.state[event] !== this.props.bot[event]) {
      this.props.onEditBot(this.props.bot.id, { [event]: this.state[event] });
    }
  }

  render() {
    let { address, name, language, channel } = this.state;
    const { t } = this.props;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onError={(errors) => null}
          onSubmit={(e) => null}
        >
          <TextValidator
            className="mb-4 w-full"
            label={t("bot-settings.address")}
            onChange={this.handleChange}
            type="text"
            name="address"
            value={address}
          />
          <TextValidator
            className="mb-4 w-full"
            label={t("bot-settings.name")}
            onChange={this.handleChange}
            type="text"
            name="name"
            value={name}
          />
          <TextValidator
            className="mb-4 w-full"
            label={t("bot-settings.channel")}
            onChange={this.handleChange}
            type="number"
            name="channel"
            value={channel}
          />
          <SelectValidator
            className="mb-4 w-full"
            label={t("bot-settings.language")}
            name="language"
            value={language}
            onChange={this.handleChange}
          >
            <MenuItem value="pl">Polski</MenuItem>
            <MenuItem value="de">Deutsch</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="cs">český</MenuItem>
            <MenuItem value="da">dansk</MenuItem>
            <MenuItem value="fr">français</MenuItem>
            <MenuItem value="hu">magyar</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="es-ar">Spanish (Argentina)</MenuItem>
            <MenuItem value="th">ไทย</MenuItem>
          </SelectValidator>
        </ValidatorForm>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditBot: (id, props) => dispatch(editBot(id, props)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(SettingsFormBody));
