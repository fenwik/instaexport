import { TOGGLE_THEME } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const toggleTheme = (device) => ({
  type: TOGGLE_THEME,
  device
});
