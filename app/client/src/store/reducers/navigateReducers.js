import { NAVIGATE, NAVIGATE_SUBNAV } from "../actions/navigateActions";

const initialState = {
  dashboard: {
    index: null,
  },
  subnav: {
    openSubSidebar: false,
    index: null,
  },
};

const navigate = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        dashboard: action.payload,
      };
    case NAVIGATE_SUBNAV:
      return {
        ...state,
        subnav: action.payload,
      };
    default:
      return state;
  }
};

export default navigate;
