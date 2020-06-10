import React, {
  memo,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Container,
  Row,
  Col
} from 'react-grid-system';

import { noop } from '../../utils';
import Post from '../../components/Post';
import AppearCursor from '../../components/AppearCursor';
import Spinner from '../../components/Spinner';
import ThemeSwitcher from '../../components/ThemeSwitcher';

import style from './Home.scss';
import Hashtags from '../../components/Hashtags';

const hashtags = [
  'cats',
  'luxury',
  'cars',
  'girls'
];

const Home = ({
  fetching,
  pendingCount,
  posts,
  selected,
  selectedIds,
  onApply,
  onMount,
  onSelect
}) => {
  const [active, setActive] = useState(hashtags[0]);

  useEffect(() => {
    onMount(active);
  }, [
    active,
    onMount
  ]);

  return (
    <div className={style.component}>
      <Container className={style.container}>
        <div className={style.toolbar}>
          <Hashtags
            items={hashtags}
            active={active}
            onSelect={setActive}
          />

          <ThemeSwitcher />
        </div>

        <div className={style.row}>
          <div className={cn(style.col, style.left)}>
            <div className={style.scroller}>
              {(fetching || !posts.length) && (
                <Spinner className={style.spinner} />
              )}

              {!!pendingCount && (
                <button
                  className={style.pending}
                  type="button"
                  onClick={onApply}
                >
                  {pendingCount} new posts
                </button>
              )}

              <Row>
                {posts.map((post) => (
                  <Col
                    md={6}
                    lg={6}
                    key={post.shortcode}
                    className={style.item}
                  >
                    <Post
                      id={post.shortcode}
                      caption={post.caption}
                      thumbnail={post.thumbnail}
                      selected={selectedIds.includes(post.shortcode)}
                      onClick={onSelect}
                    />
                  </Col>
                ))}
              </Row>

              {!!pendingCount && (
                <AppearCursor onAppear={onApply} />
              )}
            </div>
          </div>

          <div className={cn(style.col, style.right)}>
            <div className={style.scroller}>
              {!selected.length && (
                <div className={style.empty}>
                  Selected photos will be displayed here
                </div>
              )}

              <Row>
                {selected.map((post) => (
                  <Col
                    md={6}
                    lg={6}
                    key={post.shortcode}
                    className={style.item}
                  >
                    <Post
                      id={post.shortcode}
                      caption={post.caption}
                      thumbnail={post.thumbnail}
                      selected={selectedIds.includes(post.shortcode)}
                      onClick={onSelect}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const PostPropType = PropTypes.shape({
  shortcode: PropTypes.string,
  caption: PropTypes.string,
  thumbnail: PropTypes.string
});

Home.propTypes = {
  fetching: PropTypes.bool,
  pendingCount: PropTypes.number,
  posts: PropTypes.arrayOf(PostPropType),
  selected: PropTypes.arrayOf(PostPropType),
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  onApply: PropTypes.func,
  onMount: PropTypes.func,
  onSelect: PropTypes.func
};

Home.defaultProps = {
  fetching: false,
  pendingCount: 0,
  posts: [],
  selected: [],
  selectedIds: [],
  onApply: noop,
  onMount: noop,
  onSelect: noop
};

export default memo(Home);
