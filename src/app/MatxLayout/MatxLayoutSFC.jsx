import React, { useContext, useEffect } from "react";
import { MatxLayouts } from "./index";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { connect } from "react-redux";
import AppContext from "app/appContext";
import {
  setLayoutSettings,
  setDefaultSettings,
} from "app/redux/actions/LayoutActions";
import { isEqual, merge } from "lodash";
import { isMdScreen } from "utils";
import { MatxSuspense } from "matx";

let tempSettings;

const MatxLayoutSFC = (props) => {
  let appContext = useContext(AppContext);
  const { settings, defaultSettings, setLayoutSettings } = props;

  tempSettings = settings;

  useEffect(() => {
    const listenWindowResize = () => {
      let settings = tempSettings;
      if (settings.layout1Settings.leftSidebar.show) {
        let mode = isMdScreen() ? "close" : "full";
        setLayoutSettings(
          merge({}, settings, { layout1Settings: { leftSidebar: { mode } } })
        );
      }
    };
    listenWindowResize();
    if (window) {
      // LISTEN WINDOW RESIZE
      window.addEventListener("resize", listenWindowResize);
    }
    return () => {
      if (window) {
        window.removeEventListener("resize", listenWindowResize);
      }
    };
  }, [setLayoutSettings]);

  useEffect(() => {
    const updateSettingsFromRouter = () => {
      const { routes } = appContext;
      const matched = matchRoutes(routes, props.location.pathname)[0];

      if (matched && matched.route.settings) {
        // ROUTE HAS SETTINGS
        const updatedSettings = merge({}, tempSettings, matched.route.settings);
        if (!isEqual(tempSettings, updatedSettings)) {
          setLayoutSettings(updatedSettings);
          // console.log('Route has settings');
        }
      } else if (!isEqual(tempSettings, defaultSettings)) {
        setLayoutSettings(defaultSettings);
        // console.log('reset settings', defaultSettings);
      }
    };
    updateSettingsFromRouter();
  }, [props.location, appContext, defaultSettings, setLayoutSettings]);

  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
  defaultSettings: state.layout.defaultSettings,
});

export default withRouter(
  connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(
    MatxLayoutSFC
  )
);
