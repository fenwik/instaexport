import {
  DEFAULT_PREFIX,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN
} from '@giantmachines/redux-websocket';

import { APPLY_PENDING_POSTS } from './constants';

import { createReducer } from '../utils';

const defaultState = {
  connected: false,
  fetching: false,
  data: [],
  pending: [],
  selected: []
};

const posts = createReducer(defaultState, {
  [APPLY_PENDING_POSTS]: (state) => ({
    ...state,
    data: [
      ...state.data,
      ...state.pending.slice(0, 12)
    ],
    pending: state.pending.slice(12)
  }),

  [`${DEFAULT_PREFIX}::${WEBSOCKET_CONNECT}`]: (state) => ({
    ...state,
    fetching: true
  }),

  [`${DEFAULT_PREFIX}::${WEBSOCKET_OPEN}`]: (state) => ({
    ...state,
    fetching: false,
    connected: true
  }),

  [`${DEFAULT_PREFIX}::${WEBSOCKET_CLOSED}`]: () => ({
    ...defaultState
  }),

  [`${DEFAULT_PREFIX}::${WEBSOCKET_MESSAGE}`]: (state, action) => ({
    ...state,
    pending: [
      ...state.pending || [],
      ...JSON.parse(action.payload.message).posts
    ]
  })
});

export default posts;
