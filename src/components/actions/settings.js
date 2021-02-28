/*
 * action types
 */

export const SET_THEME = "SET_THEME";

export const SET_UNIT = "SET_UNIT";

/*
 * action creators
 */

export function setTheme(theme) {
  return { type: SET_THEME, theme };
}

export function setUnit(unit) {
  return { type: SET_UNIT, unit };
}
