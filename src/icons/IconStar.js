import React from 'react';
import PropTypes from 'prop-types';

const IconStar = ({
  className,
  color,
  width,
  height,
  ...props
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={color}
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

IconStar.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

IconStar.defaultProps = {
  className: null,
  color: '#000',
  width: 24,
  height: 24
};

export default IconStar;
