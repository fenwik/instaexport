import { connect } from '@giantmachines/redux-websocket/dist';

import {
  APPLY_PENDING_POSTS,
  SELECT_POST
} from './constants';
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

export const subscribeHashtag = (hashtag) => connect(buildWsUrl(`${hashtag}/`));

export const selectPost = (id) => ({
  type: SELECT_POST,
  id
});
