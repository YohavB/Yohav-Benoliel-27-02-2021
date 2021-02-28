import { SET_TOWNID } from "../actions/townID";

const initialState = {
  townID: "",
};

const townID = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOWNID:
      return {
        ...state,
        townID: action.townID,
      };
    default:
      return state;
  }
};

export default townID;
