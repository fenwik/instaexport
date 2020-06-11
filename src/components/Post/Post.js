import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { noop } from '../../utils';
import IconStar from '../../icons/IconStar';

import style from './Post.scss';

const Post = ({
  id,
  className,
  caption,
  thumbnail,
  selected,
  hideMark,
  onClick
}) => (
  <button
    className={cn(style.component, className)}
    type="button"
    onClick={() => onClick(id)}
  >
    <figure>
      <div className={style.thumbnail}>
        <img
          alt={caption}
          draggable="false"
          src={thumbnail}
        />
      </div>

      {selected && !hideMark && (
        <div className={style.icon}>
          <IconStar
            color="#1976D2"
            height={32}
            width={32}
          />
        </div>
      )}

      <figcaption className={style.caption}>
        {!!caption && (
          <p>{caption.slice(0, 100)}</p>
        )}
      </figcaption>
    </figure>
  </button>
);

Post.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  caption: PropTypes.string,
  thumbnail: PropTypes.string,
  selected: PropTypes.bool,
  hideMark: PropTypes.bool,
  onClick: PropTypes.func
};

Post.defaultProps = {
  id: null,
  className: null,
  caption: null,
  thumbnail: null,
  selected: false,
  hideMark: false,
  onClick: noop
};

export default memo(Post);
