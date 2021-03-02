/*
 * action types
 */

export const TOGGLE_THEME = "TOGGLE_THEME";
export const TOGGLE_METRIC = "TOGGLE_METRIC";

/*
 * action creators
 */

export function setTheme(theme) {
  return { type: TOGGLE_THEME, theme };
}

export function setMetric(metric) {
  return { type: TOGGLE_METRIC, metric };
}
