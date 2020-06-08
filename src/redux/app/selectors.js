import { createSelector } from 'reselect';

const slice = (state) => state.app;

// eslint-disable-next-line import/prefer-default-export
export const themeSelector = createSelector(
  slice,
  ({ theme }) => theme
);
