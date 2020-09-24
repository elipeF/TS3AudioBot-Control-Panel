import React, { Component, Fragment } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { delBotRights } from "app/redux/actions/BotRightsActions";
import AdvanceTable from "app/ui/AdvanceTable";

class RightsTable extends Component {
  state = {
    useruid: [
      {
        title: "username",
        field: "id",
        cellStyle: { textAlign: "center" },
        render: (rowData) => {
          return rowData.admin ? (
            <Fragment>
              <span className="pr-3">{rowData.id}</span>
              <Button disabled variant="outlined">
                admin
              </Button>
            </Fragment>
          ) : (
            rowData.id
          );
        },
      },
    ],
    groupid: [
      {
        title: "id",
        field: "id",
        cellStyle: { textAlign: "center" },
        render: (rowData) => {
          return rowData.admin ? (
            <Fragment>
              <span className="pr-3">{rowData.id}</span>
              <Button disabled variant="outlined">
                admin
              </Button>
            </Fragment>
          ) : (
            rowData.id
          );
        },
      },
    ],
    data: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="overflow-auto">
        <AdvanceTable
          title=""
          columns={this.state[this.props.type]}
          data={this.props.data}
          actions={[
            {
              icon: "delete",
              tooltip: "Usuń",
              onClick: (event, rowData) =>
                this.props.onRightDel(this.props.botId, {
                  type: this.props.type,
                  admin: rowData.admin,
                  value: rowData.id,
                }),
            },
          ]}
          options={{
            paginationType: "stepped",
            headerStyle: {
              display: "none",
            },
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRightDel: (id, data) => dispatch(delBotRights(id, data)),
  };
};

export default connect(null, mapDispatchToProps)(RightsTable);
