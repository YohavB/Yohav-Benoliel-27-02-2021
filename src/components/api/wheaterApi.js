import axios from "axios";
import { api } from "./api";

export function getCurrentWeatherAPI(townID) {
  return axios.get(
    `  ${api.base}/currentconditions/v1/${townID}?apikey=%09${api.key}`
  );
}

export function autocompleteAPI(query) {
  return axios.get(
    `${api.base}/locations/v1/cities/autocomplete?apikey=%09${api.key}&q=${query}`
  );
}

export function getWeatherByPositionAPI(lat, lon) {
  return axios.get(
    `  ${api.base}/locations/v1/cities/geoposition/search?apikey=${api.key}&q=${lat}%2C${lon}`
  );
}

export function getForecastAPI(townID, metric) {
  return axios.get(
    `  ${api.base}/forecasts/v1/daily/5day/${townID}?apikey=%09${api.key}&metric=${metric}`
  );
}
