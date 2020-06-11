import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useScreenClass } from 'react-grid-system';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { noop } from '../../utils';
import Post from '../Post';
import IconGallery from '../../icons/IconGallery';

import style from './PostsSelectedList.scss';

const PostsSelectedList = ({
  theme,
  items,
  onSelect
}) => {
  const screenClass = useScreenClass();

  const {
    colCount,
    rowCount
  } = useMemo(() => {
    const total = items.length;
    const mobile = ['xs', 'sm', 'md'].includes(screenClass);

    return {
      colCount: mobile ? 1 : 2,
      rowCount: mobile ? total : Math.ceil(total / 2)
    };
  }, [
    items,
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

  const isItemLoaded = useCallback(() => true, []);

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
      {!items.length && (
        <div className={style.empty}>
          <div>Selected photos will be <br />displayed here</div>

          <IconGallery
            className={style.icon}
            color={theme === 'dark' ? '#FFF' : '#000'}
          />
        </div>
      )}

      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={rowCount}
            loadMoreItems={noop}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                ref={ref}
                className={style.scroller}
                height={height}
                itemCount={rowCount}
                itemData={rows}
                itemSize={width / colCount + 64}
                width={width}
                onItemsRendered={onItemsRendered}
              >
                {renderLine}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

const PostPropType = PropTypes.shape({
  id: PropTypes.string,
  caption: PropTypes.string,
  thumbnail: PropTypes.string
});

PostsSelectedList.propTypes = {
  items: PropTypes.arrayOf(PostPropType),
  theme: PropTypes.string,
  onSelect: PropTypes.func
};

PostsSelectedList.defaultProps = {
  items: [],
  theme: null,
  onSelect: noop
};

export default memo(PostsSelectedList);
