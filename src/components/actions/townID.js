/*
 * action types
 */

export const SET_TOWNID = "SET_TOWNID";

/*
 * action creators
 */

export function setTownID(id) {
  return { type: SET_TOWNID, id };
}
