import { SET_FAVORITE, REMOVE_FAVORITE } from "../actions/data";
import { SET_TOWNID } from "../actions/data";
import { SET_WEATHER_DATA } from "../actions/data";

const initialState = {
  favorites: [],
  weatherData: [],
  townID: "",
};

export const favorites = (state = initialState.favorites, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.id],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.find((id) => id !== action.id),
      };
    default:
      return state;
  }
};

export const townID = (state = initialState.townID, action) => {
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

export const weatherData = (state = initialState.weatherData, action) => {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: [...state.weatherData, action.id],
      };

    default:
      return state;
  }
};
