import instance from "./../../../axios";
import { newNotification } from "./NotificationsActions";
import { getUsersList } from "./UsersActions";

export const CREATE_USER_START = "CREATE_USER_START";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";

export const createUser = (name, password) => (dispatch) => {
  dispatch({
    type: CREATE_USER_START,
  });

  instance
    .post(`http://${window.location.hostname}:8081/auth/register`, {
      name,
      password,
    })
    .then((res) => {
      dispatch({
        type: CREATE_USER_SUCCESS,
      });
      dispatch(getUsersList());
      dispatch(
        newNotification({
          type: "success",
          message: CREATE_USER_SUCCESS,
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
        type: CREATE_USER_FAIL,
        payload: e,
      });
    });
};
