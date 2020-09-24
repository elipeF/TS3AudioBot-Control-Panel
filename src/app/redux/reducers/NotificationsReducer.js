import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/NotificationsActions";

const initialState = {
  messages: [],
};

const NotificationsReducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    }
    case REMOVE_NOTIFICATION: {
      return {
        ...state,
        messages: [...state.messages.slice(0, 0), ...state.messages.slice(1)]
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default NotificationsReducer;
