import { SET_THEME } from "../actions/settings";
import { SET_METRIC } from "../actions/settings";

const initialState = {
  theme: false,
  metric: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
	case SET_THEME: // TODO TOGGLE_THEME
	  return {
	    ...state,
	    theme: !state.theme,
	  };
	case SET_METRIC: // TODO TOGGLE_METRIC
		return {
		  ...state,
		  metric: !state.metric,
		};
    default:
      return state;
  }
};
