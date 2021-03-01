/*
 * action types
 */

export const POPULATE_FAVORITE = "POPULATE_FAVORITE";
export const SET_FAVORITE = "SET_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const SET_TOWNID = "SET_TOWNID";
export const SET_TOWN_NAME = "SET_TOWN_NAME";
export const SET_WEATHER_DATA = "SET_WEATHER_DATA";

/*
 * action creators
 */

export function populateFavorites(favorites) {
  return { type: POPULATE_FAVORITE, favorites };
}

export function setFavorite(favorite) {
  return { type: SET_FAVORITE, favorite };
}

export function removeFavorite(id) {
  return { type: REMOVE_FAVORITE, id };
}

export function setTownID(townID) {
  return { type: SET_TOWNID, townID };
}

export function setTownName(townName) {
  return { type: SET_TOWN_NAME, townName };
}

export function setWeatherData(weatherData) {
  return { type: SET_WEATHER_DATA, weatherData };
}
