/*
 * action types
 */

export const SET_THEME = "SET_THEME";

export const SET_METRIC = "SET_METRIC";

/*
 * action creators
 */

export function setTheme(theme) {
  return { type: SET_THEME, theme };
}

export function setMetric(metric) {
  return { type: SET_METRIC, metric };
}
