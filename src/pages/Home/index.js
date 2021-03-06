import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  pendingPostsCountSelector
} from '../../redux/posts/selectors';
import {
  applyPendingPosts,
  subscribeHashtag
} from '../../redux/posts/actions';

import Home from './Home';

const mapStateToProps = createStructuredSelector({
  pendingCount: pendingPostsCountSelector
});

const mapDispatchToProps = {
  onMount: subscribeHashtag,
  onLoadMore: applyPendingPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
