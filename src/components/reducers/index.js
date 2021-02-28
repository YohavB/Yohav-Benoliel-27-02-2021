import { combineReducers } from "redux";
import unit from "./units";
import favorites from "./favorites";
import theme from "./theme";
import counter from "./counter";

const reducers = combineReducers({
  unit,
  favorites,
  theme,
  counter,
});

export default reducers;
