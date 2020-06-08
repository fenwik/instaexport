import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { noop } from '../../utils';

import style from './Hashtags.scss';

const Hashtags = ({
  className,
  active,
  items,
  onSelect
}) => (
  <div className={cn(style.component, className)}>
    {items.map((hashtag) => (
      <button
        key={hashtag}
        className={cn(style.hashtag, { [style.active]: hashtag === active })}
        aria-pressed={String(hashtag === active)}
        type="button"
        onClick={() => onSelect(hashtag)}
      >
        {hashtag}
      </button>
    ))}
  </div>
);

Hashtags.propTypes = {
  className: PropTypes.string,
  active: PropTypes.string,
  items: PropTypes.array,
  onSelect: PropTypes.func
};

Hashtags.defaultProps = {
  className: '',
  active: null,
  items: [],
  onSelect: noop
};

export default memo(Hashtags);
