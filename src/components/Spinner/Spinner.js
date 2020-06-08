import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './Spinner.scss';

const Spinner = ({
  className,
  size
}) => (
  <div className={cn(style.component, className)}>
    <svg
      className={style.spinner}
      width={size}
      height={size}
      viewBox="0 0 66 66"
    >
      <circle
        className={style.path}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number
};

Spinner.defaultProps = {
  className: '',
  size: 48
};

export default memo(Spinner);
