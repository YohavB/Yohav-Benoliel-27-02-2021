import { SET_THEME } from "../actions/settings";
import { SET_METRIC } from "../actions/settings";

const initialState = {
  theme: false,
  metric: true,
};

export const theme = (state = initialState.theme, action) => {
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

export const metric = (state = initialState.metric, action) => {
  switch (action.type) {
    case SET_METRIC:
      return {
        ...state,
        metric: !metric,
      };
    default:
      return state;
  }
};
