import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  pendingPostsCountSelector,
  postsFetchingSelector,
  postsSelector
} from '../../redux/posts/selectors';
import {
  applyPendingPosts,
  subscribeHashtag
} from '../../redux/posts/actions';

import Home from './Home';

const mapStateToProps = createStructuredSelector({
  fetching: postsFetchingSelector,
  pendingCount: pendingPostsCountSelector,
  posts: postsSelector
});

const mapDispatchToProps = {
  onMount: subscribeHashtag,
  onApply: applyPendingPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
