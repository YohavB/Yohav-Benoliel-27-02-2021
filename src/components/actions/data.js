/*
 * action types
 */

export const SET_FAVORITE = "SET_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const SET_TOWNID = "SET_TOWNID";
export const SET_WEATHER_DATA = "SET_WEATHER_DATA";

/*
 * action creators
 */

export function setFavorite(id) {
  return { type: SET_FAVORITE, id };
}

export function removeFavorite(id) {
  return { type: REMOVE_FAVORITE, id };
}

export function setTownID(id) {
  return { type: SET_TOWNID, id };
}

export function setWeatherData(weatherData) {
  return { type: SET_WEATHER_DATA, weatherData };
}
