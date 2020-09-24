import { EDIT_BOT_FAIL, EDIT_BOT_START, EDIT_BOT_SUCCESS, GET_BOT_FAIL, GET_BOT_START, GET_BOT_SUCCESS, START_BOT_FAIL, START_BOT_START, START_BOT_SUCCESS, STOP_BOT_FAIL, STOP_BOT_START, STOP_BOT_SUCCESS } from "../actions/BotSettingsActions";

const initialState = {
  bot: null,
  loading: true,
};

const BotSettingsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_BOT_START: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_BOT_SUCCESS: {
      return {
        ...state,
        loading: false,
        bot: { ...action.payload }
      };
    }
    case GET_BOT_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case START_BOT_START: {
      return {
        ...state,
        loading: true
      }
    }
    case START_BOT_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case START_BOT_FAIL: {
      return {
        ...state,
        loading: false
      }
    }
    case STOP_BOT_START: {
      return {
        ...state,
        loading: true
      }
    }
    case STOP_BOT_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case STOP_BOT_FAIL: {
      return {
        ...state,
        loading: false
      }
    }
    case EDIT_BOT_START: {
      return {
        ...state,
        loading: true
      }
    }
    case EDIT_BOT_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case EDIT_BOT_FAIL: {
      return {
        ...state,
        loading: false
      }
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default BotSettingsReducer;
