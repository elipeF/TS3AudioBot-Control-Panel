import instance from "./../../../axios";
import { newNotification } from "./NotificationsActions";

export const CREATE_BOT_START = "CREATE_BOT_START";
export const CREATE_BOT_SUCCESS = "CREATE_BOT_SUCCESS";
export const CREATE_BOT_FAIL = "CREATE_BOT_FAIL";

export const createBot = (data) => (dispatch) => {
  dispatch({
    type: CREATE_BOT_START,
  });

  instance
    .post(`http://${window.location.hostname}:8081/bots/`, { ...data })
    .then((res) => {
      dispatch({
        type: CREATE_BOT_SUCCESS,
      });
      dispatch(
        newNotification({
          type: "success",
          message: CREATE_BOT_SUCCESS,
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
      dispatch({
        type: CREATE_BOT_FAIL,
        payload: e,
      });
    });
};
