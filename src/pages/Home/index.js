import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  pendingPostsCountSelector,
  postsFetchingSelector,
  postsSelector,
  selectedPostsSelector,
  selectedPostsIdsSelector
} from '../../redux/posts/selectors';
import {
  applyPendingPosts,
  selectPost,
  subscribeHashtag
} from '../../redux/posts/actions';

import Home from './Home';

const mapStateToProps = createStructuredSelector({
  fetching: postsFetchingSelector,
  pendingCount: pendingPostsCountSelector,
  posts: postsSelector,
  selected: selectedPostsSelector,
  selectedIds: selectedPostsIdsSelector
});

const mapDispatchToProps = {
  onMount: subscribeHashtag,
  onApply: applyPendingPosts,
  onSelect: selectPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
