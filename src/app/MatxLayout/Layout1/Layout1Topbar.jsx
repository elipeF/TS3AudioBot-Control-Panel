import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Icon, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import PropTypes from "prop-types";
import { MatxMenu } from "matx";
import { isMdScreen, classList } from "utils";
import i18n from "i18n";

const styles = (theme) => ({
  topbar: {
    "& .topbar-hold": {
      backgroundColor: theme.palette.primary.main,
      height: "80px",
      "&.fixed": {
        boxShadow: theme.shadows[8],
        height: "64px",
      },
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
});

class Layout1Topbar extends Component {
  state = {};

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    this.props.logoutUser();
  };

  render() {
    let { classes, fixed } = this.props;

    return (
      <div className={`topbar ${classes.topbar}`}>
        <div className={classList({ "topbar-hold": true, fixed: fixed })}>
          <div className="flex justify-between items-center h-full">
            <div className="flex">
              <IconButton
                onClick={this.handleSidebarToggle}
                className="hide-on-pc"
              >
                <Icon>menu</Icon>
              </IconButton>
            </div>
            <div className="flex items-center">
              <MatxMenu
                menuButton={
                  <IconButton>
                    <Icon>g_translate</Icon>
                  </IconButton>
                }
              >
                <Button onClick={() => i18n.changeLanguage("pl")}>
                  <span className="pl-4"> Polski </span>
                </Button>
                <Button onClick={() => i18n.changeLanguage("en")}>
                  <span className="pl-4"> English </span>
                </Button>
              </MatxMenu>
              <IconButton onClick={this.handleSignOut}>
                <Icon> power_settings_new </Icon>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)
  )
);
