import React, {
  memo,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';

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
  onApply,
  onMount
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
      <Container>
        <div className={style.toolbar}>
          <Hashtags
            items={hashtags}
            active={active}
            onSelect={setActive}
          />

          <ThemeSwitcher />
        </div>

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

        {!!posts && (
          <Row>
            {posts.map((post) => (
              <Col
                sm={6}
                md={4}
                lg={3}
                key={post.shortcode}
                className={style.col}
              >
                <Post
                  caption={post.caption}
                  thumbnail={post.thumbnail}
                />
              </Col>
            ))}
          </Row>
        )}

        {!!pendingCount && (
          <AppearCursor onAppear={onApply} />
        )}
      </Container>
    </div>
  );
};

Home.propTypes = {
  fetching: PropTypes.bool,
  pendingCount: PropTypes.number,
  posts: PropTypes.array,
  onApply: PropTypes.func,
  onMount: PropTypes.func
};

Home.defaultProps = {
  fetching: false,
  pendingCount: 0,
  posts: [],
  onApply: noop,
  onMount: noop
};

export default memo(Home);
