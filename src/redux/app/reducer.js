import { createReducer } from '../utils';
import {
  SET_THEME,
  TOGGLE_THEME
} from './constants';

const initialState = {
  theme: null
};

const app = createReducer(initialState, {
  [SET_THEME]: (state, { theme }) => ({
    ...state,
    theme
  }),

  [TOGGLE_THEME]: (state) => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light'
  })
});

export default app;
