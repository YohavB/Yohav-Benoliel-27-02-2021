/*
 * action types
 */

export const SET_WEATHER_DATA = "SET_WEATHER_DATA";

/*
 * action creators
 */

export function setWeatherData(weatherData) {
  return { type: SET_WEATHER_DATA, weatherData };
}
