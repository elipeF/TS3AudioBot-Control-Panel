import { withSnackbar } from "notistack";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { removeNotification } from "./redux/actions/NotificationsActions";

const NotificationDisplay = (props) => {
  const { notification, enqueueSnackbar, onRemoveNotification } = props;
  const { t } = useTranslation();
  useEffect(() => {
    if (notification.length > 0) {
      enqueueSnackbar(t("responses." + notification[0].message), {
        variant: notification[0].type,
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      onRemoveNotification();
    }
  }, [notification, enqueueSnackbar, onRemoveNotification, t]);
  return null;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveNotification: () => dispatch(removeNotification()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(NotificationDisplay));
