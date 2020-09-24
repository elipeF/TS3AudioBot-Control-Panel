import React, { Component } from "react";
import { Grid, Card, MenuItem } from "@material-ui/core";

import { connect } from "react-redux";
import { createBot } from "app/redux/actions/BotCreateActions";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { getUsersList } from "app/redux/actions/UsersActions";
import BlockButton from "app/ui/BlockButton";
import { withTranslation } from "react-i18next";

class BotCreate extends Component {
  state = {
    address: "",
    name: "",
    language: "",
    channel: 0,
    count: 1,
    owner: this.props.user.userId,
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  submit = () => {
    const data = {};
    for (const state in this.state) {
      if (state === "channel" || state === "count") {
        data[state] = +this.state[state];
      } else {
        const temp = this.state[state].trim();
        if (temp.length > 0) {
          data[state] = temp;
        }
      }
    }
    this.props.onBotCreate(data);
  };

  componentDidMount() {
    this.props.onUsersFetch();
  }

  render() {
    const { t } = this.props;
    return (
      <div className="analytics pt-25 m-sm-30 mt--18">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">
              <div className="flex items-center mb-4">
                <h2 className="m-0 flex-grow">{t("bot-create-title")}</h2>
              </div>

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
                  value={this.state.address}
                />
                <TextValidator
                  className="mb-4 w-full"
                  label={t("bot-settings.name")}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={this.state.name}
                />
                <TextValidator
                  className="mb-4 w-full"
                  label={t("bot-settings.channel")}
                  onChange={this.handleChange}
                  type="number"
                  name="channel"
                  value={this.state.channel}
                />
                <SelectValidator
                  className="mb-4 w-full"
                  label={t("bot-settings.language")}
                  name="language"
                  value={this.state.language}
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
                  <MenuItem value="es-ar">Spanishh (Argentina)</MenuItem>
                  <MenuItem value="th">ไทย</MenuItem>
                </SelectValidator>
                <SelectValidator
                  className="mb-4 w-full"
                  label={t("bot-settings.owner")}
                  name="owner"
                  value={this.state.owner}
                  onChange={this.handleChange}
                >
                  {this.props.users.users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </SelectValidator>
                <TextValidator
                  className="mb-4 w-full"
                  label={t("bot-settings.count")}
                  onChange={this.handleChange}
                  type="number"
                  name="count"
                  value={this.state.count}
                />
              </ValidatorForm>
              <BlockButton
                text={t("submit")}
                loading={this.props.loading}
                onClick={() => this.submit()}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    loading: state.botCreate.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersFetch: () => dispatch(getUsersList()),
    onBotCreate: (data) => dispatch(createBot(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(BotCreate));
