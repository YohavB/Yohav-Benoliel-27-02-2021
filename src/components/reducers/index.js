import { combineReducers } from "redux";
import unit from "./units";
import favorites from "./favorites";
import theme from "./theme";
import townID from "./townID";
import weatherData from "./weatherData";

const reducers = combineReducers({
  unit,
  favorites,
  theme,
  townID,
  weatherData,
});

export default reducers;
