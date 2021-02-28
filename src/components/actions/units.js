/*
 * action types
 */

export const SET_UNIT = "SET_UNIT";

/*
 * action creators
 */

export function setUnit(unit) {
  return { type: SET_UNIT, unit };
}
