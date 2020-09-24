import React, { Component, Fragment } from "react";
import { Grid, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { getUsersList } from "app/redux/actions/UsersActions";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { createUser } from "app/redux/actions/UserCreateActions";
import Spinner from "../../ui/Spinner";
import AdvanceTable from "app/ui/AdvanceTable";
import BlockButton from "app/ui/BlockButton";
import RemoveUserModal from "./RemoveUserModal";
import PasswordChangeModal from "./PasswordChangeModal";
import { withTranslation } from "react-i18next";

class Users extends Component {
  state = {
    users: [],
    loading: true,
    name: "",
    password: "",
    removeModalOpen: false,
    passwordChangeModalOpen: false,
    useruuid: null,
  };

  componentDidMount() {
    this.props.onUsersFetch();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.users.users !== this.props.users.users) {
      const newUsers = [];
      for (const user of this.props.users.users) {
        if (!user.admin) {
          newUsers.push(user);
        }
      }
      this.setState({ ...this.state, loading: false, users: newUsers });
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleModelState = (key, value) => {
    this.setState((state) => {
      return {
        ...state,
        [key]: !state[key],
        useruuid: value,
      };
    });
  };

  render() {
    const { t } = this.props;
    const columns = [
      {
        title: "username",
        field: "username",
        cellStyle: { textAlign: "center" },
      },
    ];
    const actions = [
      {
        icon: "edit",
        tooltip: t("pass-change"),
        onClick: (event, rowData) =>
          this.handleModelState("passwordChangeModalOpen", rowData._id),
      },
      {
        icon: "delete",
        tooltip: t("delete"),
        onClick: (event, rowData) =>
          this.handleModelState("removeModalOpen", rowData._id),
      },
    ];
    return (
      <div className="analytics pt-25 m-sm-30 mt--18">
        {this.state.useruuid ? (
          <Fragment>
            <RemoveUserModal
              open={this.state.removeModalOpen}
              userId={this.state.useruuid}
              handleClose={() => this.handleModelState("removeModalOpen", null)}
            />
            <PasswordChangeModal
              open={this.state.passwordChangeModalOpen}
              userId={this.state.useruuid}
              handleClose={() =>
                this.handleModelState("passwordChangeModalOpen", null)
              }
            />
          </Fragment>
        ) : null}

        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">
              <div className="flex items-center mb-4">
                <h2 className="m-0 flex-grow">{t("user-create-title")}</h2>
              </div>
              <ValidatorForm
                ref="form"
                onError={(errors) => null}
                onSubmit={(e) => null}
              >
                <TextValidator
                  className="mb-4 w-full"
                  label={t("username")}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={this.state.name}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-4 w-full"
                  label={t("password")}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  value={this.state.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </ValidatorForm>
              <BlockButton
                loading={this.props.loading}
                text={t("submit")}
                onClick={() =>
                  this.props.onUserCreate(this.state.name, this.state.password)
                }
              />
            </Card>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">
              <div className="flex items-center">
                <h4 className="m-0 flex-grow">{t("users")}</h4>
                <span className="text-13 text-muted ml-1">
                  {this.state.users.length}
                </span>
              </div>
              <div className="overflow-auto">
                {this.state.loading ? (
                  <Spinner />
                ) : (
                  <AdvanceTable
                    data={this.state.users}
                    columns={columns}
                    actions={actions}
                    options={{
                      headerStyle: {
                        display: "none",
                      },
                    }}
                  />
                )}
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
    users: state.users,
    loading: state.userCreate.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersFetch: () => dispatch(getUsersList()),
    onUserCreate: (name, password) => dispatch(createUser(name, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Users));
