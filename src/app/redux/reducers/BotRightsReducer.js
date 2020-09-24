import { GET_BOT_RIGHTS_START, GET_BOT_RIGHTS_SUCCESS, GET_BOT_RIGHTS_FAIL, ADD_BOT_RIGHTS_START, ADD_BOT_RIGHTS_FAIL, ADD_BOT_RIGHTS_SUCCESS, DEL_BOT_RIGHTS_START, DEL_BOT_RIGHTS_SUCCESS, DEL_BOT_RIGHTS_FAIL } from "../actions/BotRightsActions";

const initialState = {
  useruid: [],
  groupid: [],
  loading: true,
};

const BotRightsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_BOT_RIGHTS_START: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_BOT_RIGHTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        useruid: [...action.payload.useruid],
        groupid: [...action.payload.groupid],
      };
    }
    case GET_BOT_RIGHTS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case ADD_BOT_RIGHTS_START: {
      return {
        ...state,
        loading: true
      };
    }
    case ADD_BOT_RIGHTS_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case ADD_BOT_RIGHTS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case DEL_BOT_RIGHTS_START: {
      return {
        ...state,
        loading: true
      };
    }
    case DEL_BOT_RIGHTS_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case DEL_BOT_RIGHTS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default BotRightsReducer;
