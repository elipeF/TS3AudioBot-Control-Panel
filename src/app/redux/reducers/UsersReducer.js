import { GET_USERS_FAIL, GET_USERS_START, GET_USERS_SUCCESS } from "../actions/UsersActions";

const initialState = {
  users: [],
  loading: true,
};

const UsersReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_START: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: [...action.payload]
      };
    }
    case GET_USERS_FAIL: {
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

export default UsersReducer;
