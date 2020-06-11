import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  pendingPostsCountSelector,
  postsFetchingSelector,
  postsSelector
} from '../../redux/posts/selectors';
import {
  applyPendingPosts,
  selectPost
} from '../../redux/posts/actions';

import InfinitePostsList from './PostsInfiniteList';

const mapStateToProps = createStructuredSelector({
  fetching: postsFetchingSelector,
  items: postsSelector,
  pendingCount: pendingPostsCountSelector
});

const mapDispatchToProps = {
  onLoadMore: applyPendingPosts,
  onSelect: selectPost
};

export default connect(mapStateToProps, mapDispatchToProps)(InfinitePostsList);
