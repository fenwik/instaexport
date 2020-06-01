import { createSelector } from 'reselect';

export const createReducer = (initialState, reducersMap = {}) => (state = initialState, action = {}) => {
  const reducer = reducersMap[action.type];
  return reducer ? reducer(state, action) : state;
};

export const createRequestReducer = (state, action, reducerMap) => {
  const reducer = reducerMap[action.status];
  return reducer ? reducer(state, action) : state;
};

export const isSuccessAction = (action) => (!!action && action.status === 'SUCCESS');

export const allActionsIsSuccess = (actions = []) => (
  actions.findIndex((action) => !isSuccessAction(action)) === -1
);

export const defaultFetchDataState = {
  data: null,
  fetching: false
};

export const defaultFetchReducer = (state, action, reducerMap = {}) => createRequestReducer(state, action, {
  SEND: () => ({
    ...state,
    fetching: true
  }),

  SUCCESS: () => ({
    ...state,
    fetching: false,
    data: action.request.response.data
  }),

  FAIL: () => ({
    ...state,
    fetching: false
  }),

  ...reducerMap
});

export const defaultFetchingSelector = (slice, defaultValue = false) => createSelector(
  slice,
  ({ fetching }) => fetching || defaultValue
);

export const defaultDataSelector = (slice, defaultValue = []) => createSelector(
  slice,
  ({ data }) => data || defaultValue
);
