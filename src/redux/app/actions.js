import {
  TOGGLE_THEME,
  SET_THEME
} from './constants';

export const toggleTheme = () => ({
  type: TOGGLE_THEME
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme
});
