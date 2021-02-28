import { SET_UNIT } from "../actions/settings";

const initialState = {
  unit: true,
};

const unit = (state = initialState, action) => {
  switch (action.type) {
    case SET_UNIT:
      return {
        ...state,
        unit: action.unit,
      };
    default:
      return state;
  }
};

export default unit;
