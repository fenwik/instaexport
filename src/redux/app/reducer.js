import { createReducer } from '../utils';
import {
  TOGGLE_THEME
} from './constants';

const initialState = {
  theme: 'light'
};

const app = createReducer(initialState, {
  [TOGGLE_THEME]: (state) => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light'
  })
});

export default app;
