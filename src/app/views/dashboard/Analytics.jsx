import React, { Component } from "react";
import { Card, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/styles";
import { getBotsList } from "app/redux/actions/BotsActions";
import UserBotsTable from "./UserBotsTable";
import OtherBotsTable from "./OtherBotsTable";
import Spinner from "../../ui/Spinner";
import StatsCard from "./StatsCard";

class Dashboard1 extends Component {
  state = {
    myBots: [],
    otherBots: [],
  };

  componentDidMount() {
    this.props.onFetchBots();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.bots !== this.props.bots) {
      const filterMyBots = this.props.bots.filter(
        (el) => el.owner === this.props.user.userId
      );
      const filterOtherBots = this.props.bots.filter(
        (el) => el.owner !== this.props.user.userId
      );
      this.setState({
        myBots: [...filterMyBots],
        otherBots: [...filterOtherBots],
      });
    }
  }

  render() {
    let myBots = <Spinner />;
    let otherBots = <Spinner />;
    if (!this.props.loading) {
      myBots = <UserBotsTable data={this.state.myBots} />;
      otherBots = <OtherBotsTable data={this.state.otherBots} />;
    }
    return (
      <div className="analytics pt-25 m-sm-30 mt--18">
        <Grid container spacing={3}>
          <StatsCard data={this.props.bots} />
          {this.props.user.role === "admin" ? (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card elevation={3} className="pt-5 mb-6 px-5">
                {otherBots}
              </Card>
            </Grid>
          ) : null}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card elevation={3} className="pt-5 mb-6 px-5">
              {myBots}
            </Card>
          </Grid>
        </Grid>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.bots.loading,
    bots: state.bots.bots,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBots: () => {
      dispatch(getBotsList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles({}, { withTheme: true })(Dashboard1));
