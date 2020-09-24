import instance from "./../../../axios";
import { newNotification } from "./NotificationsActions";

export const GET_BOTS_LIST_START = "GET_BOTS_LIST_START";
export const GET_BOTS_LIST_SUCCESS = "GET_BOTS_LIST_SUCCESS";
export const GET_BOTS_LIST_FAIL = "GET_BOTS_LIST_FAIL";

export const getBotsList = () => (dispatch) => {
  dispatch({
    type: GET_BOTS_LIST_START,
  });
  instance
    .get(`http://${window.location.hostname}:8081/bots/`)
    .then((res) => {
      dispatch({
        type: GET_BOTS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch(
        newNotification({
          type: "error",
          message: e.response?.data.message
            ? e.response.data.message
            : e.message,
        })
      );
      dispatch({
        type: GET_BOTS_LIST_FAIL,
        payload: e,
      });
    });
};
