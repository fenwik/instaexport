import { createSelector } from 'reselect';

const slice = ({ posts }) => posts;

export const postsSelector = createSelector(
  slice,
  ({ data }) => data
);

export const postsFetchingSelector = createSelector(
  slice,
  ({ fetching }) => fetching
);

export const pendingPostsCountSelector = createSelector(
  slice,
  ({ pending }) => pending.length
);
