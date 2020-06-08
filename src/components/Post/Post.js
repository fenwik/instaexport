import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './Post.scss';

const Post = ({
  className,
  caption,
  thumbnail
}) => (
  <div className={cn(style.component, className)}>
    <figure>
      <div className={style.thumbnail}>
        <img src={thumbnail} alt={caption} />
      </div>

      <figcaption className={style.caption}>
        <p>{caption.slice(0, 100)}</p>
      </figcaption>
    </figure>
  </div>
);

Post.propTypes = {
  className: PropTypes.string,
  caption: PropTypes.string,
  thumbnail: PropTypes.string
};

Post.defaultProps = {
  className: null,
  caption: null,
  thumbnail: null
};

export default memo(Post);
