import instance from "./../../../axios";
import { newNotification } from "./NotificationsActions";
import { getUsersList } from "./UsersActions";

const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";

export const removeUser = (id) => (dispatch) => {
  instance
    .delete(`http://${window.location.hostname}:8081/users/` + id)
    .then((res) => {
      dispatch(getUsersList());
      dispatch(
        newNotification({
          type: "success",
          message: REMOVE_USER_SUCCESS,
        })
      );
    })
    .catch((e) => {
      dispatch(
        newNotification({
          type: "error",
          message: e.response?.data.message
            ? e.response?.data.message
            : e.message,
        })
      );
    });
};

export const removeUserWithBotMigrate = (id, target) => (dispatch) => {
  instance
    .patch(`http://${window.location.hostname}:8081/bots/` + id + "/migrate", {
      id: target,
    })
    .then((res) => {
      dispatch(removeUser(id));
    })
    .catch((e) => {
      dispatch(
        newNotification({
          type: "error",
          message: e.response?.data.message
            ? e.response?.data.message
            : e.message,
        })
      );
    });
};

export const removeUserWithBotDelete = (id, target) => (dispatch) => {
  instance
    .delete(`http://${window.location.hostname}:8081/bots/` + id + "/all", {
      id: target,
    })
    .then((res) => {
      dispatch(removeUser(id));
    })
    .catch((e) => {
      dispatch(
        newNotification({
          type: "error",
          message: e.response?.data.message
            ? e.response?.data.message
            : e.message,
        })
      );
    });
};
