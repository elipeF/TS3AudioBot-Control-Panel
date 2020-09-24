import {
  CREATE_USER_FAIL,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
} from "../actions/UserCreateActions";

const initialState = {
  loading: false,
};

const UserCreateReducer = function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case CREATE_USER_FAIL: {
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

export default UserCreateReducer;
