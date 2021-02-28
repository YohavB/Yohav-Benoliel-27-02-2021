/*
 * action types
 */

export const SET_THEME = 'SET_THEME'


/*
 * action creators
 */

export function setTheme(theme) {
    return { type: SET_THEME, theme }
}
