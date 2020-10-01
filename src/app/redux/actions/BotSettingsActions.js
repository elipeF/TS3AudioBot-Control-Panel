import instance from "./../../../axios";
import { getBotsList } from "./BotsActions";
import { newNotification } from "./NotificationsActions";

export const GET_BOT_START = "GET_BOT_START";
export const GET_BOT_SUCCESS = "GET_BOT_SUCCESS";
export const GET_BOT_FAIL = "GET_BOT_FAIL";

export const START_BOT_START = "START_BOT_START";
export const START_BOT_SUCCESS = "START_BOT_SUCCESS";
export const START_BOT_FAIL = "START_BOT_FAIL";

export const STOP_BOT_START = "STOP_BOT_START";
export const STOP_BOT_SUCCESS = "STOP_BOT_SUCCESS";
export const STOP_BOT_FAIL = "STOP_BOT_FAIL";

export const EDIT_BOT_START = "EDIT_BOT_START";
export const EDIT_BOT_SUCCESS = "EDIT_BOT_SUCCESS";
export const EDIT_BOT_FAIL = "EDIT_BOT_FAIL";

export const TRANSFER_BOT_START = "TRANSFER_BOT_START";
export const TRANSFER_BOT_SUCCESS = "TRANSFER_BOT_SUCCESS";
export const TRANSFER_BOT_FAIL = "TRANSFER_BOT_FAIL";

export const REMOVE_BOT_START = "REMOVE_BOT_START";
export const REMOVE_BOT_SUCCESS = "REMOVE_BOT_SUCCESS";
export const REMOVE_BOT_FAIL = "REMOVE_BOT_FAIL";

export const getBot = (id) => (dispatch) => {
  dispatch({
    type: GET_BOT_START,
  });
  instance
    .get(`http://${window.location.hostname}:8081/bots/` + id)
    .then((res) => {
      dispatch({
        type: GET_BOT_SUCCESS,
        payload: res.data,
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
        type: GET_BOT_FAIL,
        payload: e,
      });
    });
};

export const startBotAndReloadBot = (id) => (dispatch) => {
  dispatch({
    type: START_BOT_START,
  });
  instance
    .post(`http://${window.location.hostname}:8081/bots/start`, { ids: [id] })
    .then((res) => {
      dispatch({
        type: START_BOT_SUCCESS,
      });
      dispatch(getBot(id));
      dispatch(
        newNotification({ type: "success", message: START_BOT_SUCCESS })
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
        type: START_BOT_FAIL,
        payload: e,
      });
    });
};

export const stopBotAndReloadBot = (id) => (dispatch) => {
  dispatch({
    type: STOP_BOT_START,
  });
  instance
    .post(`http://${window.location.hostname}:8081/bots/stop`, { ids: [id] })
    .then((res) => {
      dispatch({
        type: STOP_BOT_SUCCESS,
      });
      dispatch(getBot(id));
      dispatch(newNotification({ type: "success", message: STOP_BOT_SUCCESS }));
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
        type: STOP_BOT_FAIL,
        payload: e,
      });
    });
};

export const startBotAndReloadBots = (id) => (dispatch) => {
  dispatch({
    type: START_BOT_START,
  });
  instance
    .post(`http://${window.location.hostname}:8081/bots/start`, { ids: [id] })
    .then((res) => {
      dispatch({
        type: START_BOT_SUCCESS,
      });
      dispatch(getBotsList());
      dispatch(
        newNotification({ type: "success", message: START_BOT_SUCCESS })
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
        type: START_BOT_FAIL,
        payload: e,
      });
    });
};

export const startBotsAndReloadBots = (ids) => (dispatch) => {
  dispatch({
    type: START_BOT_START,
  });
  instance
    .post(`http://${window.location.hostname}:8081/bots/start`, { ids })
    .then((res) => {
      dispatch({
        type: START_BOT_SUCCESS,
      });
      dispatch(
        newNotification({ type: "success", message: START_BOT_SUCCESS })
      );
      dispatch(getBotsList());
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
        type: START_BOT_FAIL,
        payload: e,
      });
    });
};

export const stopBotsAndReloadBots = (ids) => (dispatch) => {
  dispatch({
    type: STOP_BOT_START,
  });
  instance
    .post(`http://${window.location.hostname}:8081/bots/stop`, { ids })
    .then((res) => {
      dispatch({
        type: STOP_BOT_SUCCESS,
      });
      dispatch(newNotification({ type: "success", message: STOP_BOT_SUCCESS }));
      dispatch(getBotsList());
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
        type: STOP_BOT_FAIL,
        payload: e,
      });
    });
};

export const stopBotAndReloadBots = (id) => (dispatch) => {
  dispatch({
    type: STOP_BOT_START,
  });
  instance
    .post(`http://${window.location.hostname}:8081/bots/stop`, { ids: [id] })
    .then((res) => {
      dispatch({
        type: STOP_BOT_SUCCESS,
      });
      dispatch(getBotsList());
      dispatch(newNotification({ type: "success", message: STOP_BOT_SUCCESS }));
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
        type: STOP_BOT_FAIL,
        payload: e,
      });
    });
};

export const editBot = (id, data) => (dispatch) => {
  dispatch({ type: EDIT_BOT_START });
  instance
    .patch(`http://${window.location.hostname}:8081/bots/` + id, {
      ...data,
      channel: +data.channel,
    })
    .then((res) => {
      dispatch({
        type: EDIT_BOT_SUCCESS,
      });
      dispatch(newNotification({ type: "success", message: EDIT_BOT_SUCCESS }));
      dispatch(getBot(id));
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
        type: EDIT_BOT_FAIL,
      });
      dispatch(getBot(id));
    });
};

export const transferBot = (botId, targetId) => (dispatch) => {
  dispatch({ type: TRANSFER_BOT_START });
  instance
    .patch(`http://${window.location.hostname}:8081/bots/` + botId + "/owner", {
      id: targetId,
    })
    .then((res) => {
      dispatch({
        type: TRANSFER_BOT_SUCCESS,
      });
      dispatch(
        newNotification({ type: "success", message: TRANSFER_BOT_SUCCESS })
      );
      dispatch(getBotsList());
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
        type: TRANSFER_BOT_FAIL,
      });
    });
};

export const removeBot = (botId) => (dispatch) => {
  dispatch({ type: REMOVE_BOT_START });
  instance
    .delete(`http://${window.location.hostname}:8081/bots/` + botId)
    .then((res) => {
      dispatch({
        type: REMOVE_BOT_SUCCESS,
      });
      dispatch(
        newNotification({ type: "success", message: REMOVE_BOT_SUCCESS })
      );
      dispatch(getBotsList());
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
        type: REMOVE_BOT_FAIL,
      });
    });
};
