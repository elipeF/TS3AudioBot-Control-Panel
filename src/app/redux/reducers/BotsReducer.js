import { GET_BOTS_LIST_FAIL, GET_BOTS_LIST_START, GET_BOTS_LIST_SUCCESS } from "../actions/BotsActions";

const initialState = {
  bots: [],
  loading: true,
};

const BotsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_BOTS_LIST_START: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_BOTS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        bots: [...action.payload]
      };
    }
    case GET_BOTS_LIST_FAIL: {
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

export default BotsReducer;
