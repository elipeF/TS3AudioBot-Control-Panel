import instance from "./../../../axios";
import { newNotification } from "./NotificationsActions";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export const getUsersList = () => (dispatch) => {
  dispatch({
    type: GET_USERS_START,
  });
  instance
    .get(`http://${window.location.hostname}:8081/users/`)
    .then((res) => {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch(
        newNotification({
          type: "error",
          message: e.response?.data.message
            ? e.response.data.message
            : e.message,
        })
      );
      dispatch({
        type: GET_USERS_FAIL,
        payload: e,
      });
    });
};
