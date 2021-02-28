import { combineReducers } from "redux";
import unit from "./units";
import favorites from "./favorites";
import theme from "./theme";
import counter from "./counter";
import weatherData from "./weatherData";

const reducers = combineReducers({
  unit,
  favorites,
  theme,
  counter,
  weatherData,
});

export default reducers;
