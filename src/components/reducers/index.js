import { combineReducers } from "redux";
import reducerSettings from "./settings";
import reducerData from "./data";

const reducers = combineReducers({
	reducerData,
	reducerSettings,
});

export default reducers;
