import jwtAuthService from "../../services/jwtAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import { newNotification } from "./NotificationsActions";
import { INIT_USER_NAVIGATION } from "./NavigationAction";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithUsernameAndPassword({ username, password }) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    jwtAuthService
      .loginWithUsernameAndPassword(username, password)
      .then((user) => {
        dispatch(setUserData(user));
        dispatch({
          type: INIT_USER_NAVIGATION,
        });

        history.push({
          pathname: "/",
        });

        return dispatch({
          type: LOGIN_SUCCESS,
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
        return dispatch({
          type: LOGIN_ERROR,
          payload: e,
        });
      });
  };
}
export function resetPassword({ email }) {
  return (dispatch) => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD,
    });
  };
}
