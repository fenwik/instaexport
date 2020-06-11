import React, {
  memo,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Container } from 'react-grid-system';

import { noop } from '../../utils';
import Hashtags from '../../components/Hashtags';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import InfinitePostsList from '../../components/PostsInfiniteList';
import PostsSelectedList from '../../components/PostsSelectedList';

import style from './Home.scss';

const hashtags = [
  'cats',
  'frontend',
  'react',
  'luxury',
  'cars',
  'girls'
];

const Home = ({
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
            <InfinitePostsList />
          </div>

          <div className={cn(style.col, style.right)}>
            <PostsSelectedList />
          </div>
        </div>
      </Container>
    </div>
  );
};

Home.propTypes = {
  onMount: PropTypes.func
};

Home.defaultProps = {
  onMount: noop
};

export default memo(Home);
