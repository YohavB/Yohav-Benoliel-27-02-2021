import {
  SET_FAVORITE,
  REMOVE_FAVORITE,
  SET_TOWN_NAME,
  POPULATE_FAVORITE,
  SET_TOWNID,
  SET_WEATHER_DATA,
} from "../actions/data";

const initialState = {
  favorites: [],
  weatherData: {},
  townID: "",
  townName: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case POPULATE_FAVORITE:
      return {
        ...state,
        favorites: action.favorites,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.townID !== action.id),
      };
    case SET_TOWNID:
      return {
        ...state,
        townID: action.townID,
      };
    case SET_TOWN_NAME:
      return {
        ...state,
        townName: action.townName,
      };
    case SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.weatherData,
      };
    default:
      return state;
  }
}
