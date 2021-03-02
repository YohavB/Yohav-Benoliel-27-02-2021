import { TOGGLE_THEME, TOGGLE_METRIC } from "../actions/settings";

const initialState = {
  theme: false,
  metric: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: !state.theme,
      };
    case TOGGLE_METRIC:
      return {
        ...state,
        metric: !state.metric,
      };
    default:
      return state;
  }
}
