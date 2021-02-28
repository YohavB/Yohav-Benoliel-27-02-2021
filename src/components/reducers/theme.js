import { SET_THEME } from "../actions/settings";

const initialState = {
  theme: false,
};

const theme = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: !theme,
      };
    default:
      return state;
  }
};

export default theme;
