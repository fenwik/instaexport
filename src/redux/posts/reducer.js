import {
  DEFAULT_PREFIX,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN
} from '@giantmachines/redux-websocket';

import {
  APPLY_PENDING_POSTS,
  SELECT_POST
} from './constants';

import { createReducer } from '../utils';

const PAGE_SIZE = 9;

const defaultState = {
  connected: false,
  fetching: false,
  data: [],
  pending: [],
  selected: []
};

const setPostId = ({ shortcode, ...props }) => ({
  id: shortcode,
  ...props
});

const posts = createReducer(defaultState, {
  [APPLY_PENDING_POSTS]: (state) => ({
    ...state,
    data: [
      ...state.data,
      ...state.pending.slice(0, PAGE_SIZE)
    ],
    pending: state.pending.slice(PAGE_SIZE)
  }),

  [SELECT_POST]: (state, { id }) => {
    const selected = [...state.selected];
    const index = selected.findIndex((item) => item.id === id);

    if (index !== -1) {
      selected.splice(index, 1);
    } else {
      const active = state.data.find((item) => item.id === id);

      if (active) {
        selected.push(active);
      }
    }

    return {
      ...state,
      selected
    };
  },

  [`${DEFAULT_PREFIX}::${WEBSOCKET_DISCONNECT}`]: (state) => ({
    ...defaultState,
    selected: state.selected
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

  [`${DEFAULT_PREFIX}::${WEBSOCKET_MESSAGE}`]: (state, action) => {
    const items = JSON.parse(action.payload.message).posts.map(setPostId);

    if (!state.data.length) {
      return {
        ...state,
        data: items
      };
    }

    return {
      ...state,
      pending: [
        ...state.pending || [],
        ...items
      ]
    };
  }
});

export default posts;
