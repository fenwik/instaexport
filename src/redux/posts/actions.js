import { connect, disconnect } from '@giantmachines/redux-websocket/dist';

import {
  APPLY_PENDING_POSTS,
  SELECT_POST
} from './constants';
import { connectedSelector } from './selectors';
import config from '../../config';

const buildWsUrl = (endpoint) => {
  const {
    API_WS_PROTOCOL,
    API_HOST,
    API_PATH
  } = config;

  return `${API_WS_PROTOCOL}://${API_HOST}${API_PATH}websocket/${endpoint}`;
};

export const applyPendingPosts = () => ({
  type: APPLY_PENDING_POSTS
});

export const subscribeHashtag = (hashtag) => (dispatch, getState) => {
  if (connectedSelector(getState())) {
    dispatch(disconnect());
  }

  dispatch(connect(buildWsUrl(`${hashtag}/`)));
};

export const selectPost = (id) => ({
  type: SELECT_POST,
  id
});
