import instance from "./../../../axios";
import { newNotification } from "./NotificationsActions";

export const GET_BOT_RIGHTS_START = "GET_BOT_RIGHTS_START";
export const GET_BOT_RIGHTS_SUCCESS = "GET_BOT_RIGHTS_SUCCESS";
export const GET_BOT_RIGHTS_FAIL = "GET_BOT_RIGHTS_FAIL";

export const ADD_BOT_RIGHTS_START = "ADD_BOT_RIGHTS_START";
export const ADD_BOT_RIGHTS_SUCCESS = "ADD_BOT_RIGHTS_SUCCESS";
export const ADD_BOT_RIGHTS_FAIL = "ADD_BOT_RIGHTS_FAIL";

export const DEL_BOT_RIGHTS_START = "DEL_BOT_RIGHTS_START";
export const DEL_BOT_RIGHTS_SUCCESS = "DEL_BOT_RIGHTS_SUCCESS";
export const DEL_BOT_RIGHTS_FAIL = "DEL_BOT_RIGHTS_FAIL";

export const getBotRights = (id) => (dispatch) => {
  dispatch({
    type: GET_BOT_RIGHTS_START,
  });

  instance
    .get(`/api/bots/` + id + "/rights")
    .then((res) => {
      const groupid = [];
      const useruid = [];
      if (res.data.admins) {
        for (const adminuid of res.data.admins.useruid) {
          useruid.push({ admin: true, id: adminuid });
        }
        for (const adminugid of res.data.admins.groupid) {
          groupid.push({ admin: true, id: adminugid });
        }
      }

      for (const adminuid of res.data.users.useruid) {
        useruid.push({ admin: false, id: adminuid });
      }
      for (const adminugid of res.data.users.groupid) {
        groupid.push({ admin: false, id: adminugid });
      }
      dispatch({
        type: GET_BOT_RIGHTS_SUCCESS,
        payload: { useruid, groupid },
      });
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
        type: GET_BOT_RIGHTS_FAIL,
        payload: e,
      });
    });
};

export const addBotRights = (id, data) => (dispatch) => {
  dispatch({
    type: ADD_BOT_RIGHTS_START,
  });

  instance
    .post(`/api/bots/` + id + "/rights", {
      [data.type]: data.value,
      type: data.admin ? "admin" : "user",
    })
    .then((res) => {
      dispatch({
        type: ADD_BOT_RIGHTS_SUCCESS,
      });
      dispatch(getBotRights(id));
      dispatch(
        newNotification({ type: "success", message: ADD_BOT_RIGHTS_SUCCESS })
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
        type: ADD_BOT_RIGHTS_FAIL,
        payload: e,
      });
    });
};

export const delBotRights = (id, data) => (dispatch) => {
  dispatch({
    type: DEL_BOT_RIGHTS_START,
  });
  instance
    .delete(`/api/bots/` + id + "/rights", {
      data: { [data.type]: data.value, type: data.admin ? "admin" : "user" },
    })
    .then((res) => {
      dispatch({
        type: DEL_BOT_RIGHTS_SUCCESS,
      });
      dispatch(getBotRights(id));
      dispatch(
        newNotification({ type: "success", message: DEL_BOT_RIGHTS_SUCCESS })
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
        type: DEL_BOT_RIGHTS_FAIL,
        payload: e,
      });
    });
};
