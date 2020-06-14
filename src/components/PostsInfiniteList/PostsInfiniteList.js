import React, {
  memo,
  useCallback,
  useMemo,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { useScreenClass } from 'react-grid-system';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import cn from 'classnames';

import { noop } from '../../utils';
import Post from '../Post';
import Spinner from '../Spinner';

import style from './PostsInfiniteList.scss';

const PAGE_SIZE = 10;

const PostsInfiniteList = ({
  fetching,
  items,
  pendingCount,
  onLoadMore,
  onSelect
}) => {
  const screenClass = useScreenClass();
  const listRef = useRef(null);

  const {
    colCount,
    rowCount
  } = useMemo(() => {
    const total = items.length + Math.min(PAGE_SIZE, pendingCount);
    const mobile = ['xs', 'sm', 'md'].includes(screenClass);

    return {
      colCount: mobile ? 1 : 2,
      rowCount: mobile ? total : Math.ceil(total / 2)
    };
  }, [
    items,
    pendingCount,
    screenClass
  ]);

  const rows = useMemo(() => items.reduce((prev, post) => {
    const last = prev[prev.length - 1];

    if (last.length < colCount) {
      last.push(post);
      return prev;
    }

    return [...prev, [post]];
  }, [[]]), [
    items,
    colCount
  ]);

  const isItemLoaded = useCallback((index) => (
    index * colCount < items.length
  ), [
    colCount,
    items
  ]);

  const loadMoreItems = useCallback((startIndex, endIndex) => {
    if (endIndex >= Math.floor(items.length / colCount)) {
      return Promise.resolve(onLoadMore());
    }

    return Promise.resolve(noop);
  }, [
    colCount,
    items.length,
    onLoadMore
  ]);

  const setListRef = useCallback((ref) => (list) => {
    ref(list);
    listRef.current = list;
  }, []);

  const scrollTo = useCallback(() => {
    listRef.current.scrollToItem(items.length, 'start');
  }, [items]);

  const calcRowHeight = useCallback((width) => {
    if (screenClass === 'xs') {
      return width / colCount + 48;
    }

    return width / colCount + 64;
  }, [
    colCount,
    screenClass
  ]);

  const renderLine = useCallback(({
    data,
    index,
    ...props
  }) => {
    const row = data[index];

    return (
      <div
        className={style.line}
        style={props.style} // eslint-disable-line react/prop-types
      >
        {!!row && row.map((post) => (
          <div
            key={post.id}
            className={style.item}
          >
            <Post
              id={post.id}
              caption={post.caption}
              thumbnail={post.thumbnail}
              selected={post.selected}
              onClick={onSelect}
            />
          </div>
        ))}
      </div>
    );
  }, [
    onSelect
  ]);

  return (
    <div className={style.component}>
      {(fetching || !items.length) && (
        <Spinner className={style.spinner} />
      )}

      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={rowCount}
            loadMoreItems={loadMoreItems}
            threshold={1}
          >
            {({ ref, onItemsRendered }) => (
              <FixedSizeList
                ref={setListRef(ref)}
                className={style.scroller}
                height={height}
                itemCount={rowCount}
                itemData={rows}
                itemSize={calcRowHeight(width)}
                width={width}
                onItemsRendered={onItemsRendered}
              >
                {renderLine}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>

      <button
        className={cn(style.pending, { [style.active]: !!pendingCount })}
        type="button"
        onClick={scrollTo}
      >
        {pendingCount} new posts
      </button>
    </div>
  );
};

const PostPropType = PropTypes.shape({
  id: PropTypes.string,
  caption: PropTypes.string,
  thumbnail: PropTypes.string
});

PostsInfiniteList.propTypes = {
  fetching: PropTypes.bool,
  items: PropTypes.arrayOf(PostPropType),
  pendingCount: PropTypes.number,
  onLoadMore: PropTypes.func,
  onSelect: PropTypes.func
};

PostsInfiniteList.defaultProps = {
  fetching: false,
  items: [],
  pendingCount: 0,
  onLoadMore: noop,
  onSelect: noop
};

export default memo(PostsInfiniteList);
