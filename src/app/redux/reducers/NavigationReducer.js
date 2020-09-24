import { navigations } from "app/navigations";
import {
  INIT_USER_NAVIGATION,
  SET_USER_NAVIGATION,
} from "../actions/NavigationAction";

const initialState = [...navigations];

const NavigationReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAVIGATION: {
      return [...action.payload];
    }
    case INIT_USER_NAVIGATION: {
      return [...navigations];
    }
    default: {
      return [...state];
    }
  }
};

export default NavigationReducer;
