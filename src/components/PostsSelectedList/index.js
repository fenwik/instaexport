import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedPostsSelector } from '../../redux/posts/selectors';
import { selectPost } from '../../redux/posts/actions';
import { themeSelector } from '../../redux/app/selectors';

import InfinitePostsList from './PostsSelectedList';

const mapStateToProps = createStructuredSelector({
  items: selectedPostsSelector,
  theme: themeSelector
});

const mapDispatchToProps = {
  onSelect: selectPost
};

export default connect(mapStateToProps, mapDispatchToProps)(InfinitePostsList);
