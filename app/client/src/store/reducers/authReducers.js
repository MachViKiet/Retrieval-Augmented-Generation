// store/reducers/authReducer.js
import { LOGIN, LOGOUT } from "../actions/authActions";

const initialState = {
  loggedIn: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
