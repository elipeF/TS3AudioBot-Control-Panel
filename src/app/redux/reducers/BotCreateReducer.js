import {
  CREATE_BOT_FAIL,
  CREATE_BOT_START,
  CREATE_BOT_SUCCESS,
} from "../actions/BotCreateActions";

const initialState = {
  loading: false,
};

const BotCreateReducer = function (state = initialState, action) {
  switch (action.type) {
    case CREATE_BOT_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_BOT_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case CREATE_BOT_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default BotCreateReducer;
