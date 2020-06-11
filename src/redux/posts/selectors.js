import { createSelector } from 'reselect';

const slice = ({ posts }) => posts;

export const postsFetchingSelector = createSelector(
  slice,
  ({ fetching }) => fetching
);

export const connectedSelector = createSelector(
  slice,
  ({ connected }) => connected
);

export const pendingPostsCountSelector = createSelector(
  slice,
  ({ pending }) => pending.length
);

export const selectedPostsSelector = createSelector(
  slice,
  ({ selected }) => selected
);

export const selectedIdsSelector = createSelector(
  selectedPostsSelector,
  (selected) => selected.map(({ id }) => id)
);

export const postsSelector = createSelector(
  slice,
  selectedIdsSelector,
  ({ data }, ids) => data.map((item) => (
    !ids.includes(item.id) ? item : { ...item, selected: true }
  ))
);
