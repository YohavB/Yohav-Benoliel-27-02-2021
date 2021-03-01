import { combineReducers } from "redux";
import { metric, theme } from "./settings";
import { favorites, townID, weatherData } from "./data";

const reducers = combineReducers({
  metric,
  favorites,
  theme,
  townID,
  weatherData,
});

export default reducers;
