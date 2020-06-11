/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const IconGallery = ({
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
    viewBox="0 0 480 480"
    {...props}
  >
    <path
      fill={color}
      d="M480.001 248V8a8 8 0 00-8-8h-368a8 8 0 00-8 8v88h-88a8 8 0 00-8 8v240a8 8 0 008 8h64a7.88 7.88 0 001.792-.36l46.728 123.2a7.999 7.999 0 0010.319 4.639l.081-.031 344-136a8 8 0 004.514-10.374l-.01-.026L449.169 256h22.832a8 8 0 008-8zm-464 88V112h345.064l-43 16H40.001a8 8 0 00-8 8v176a8 8 0 008 8h21.792l6.064 16H16.001zm360-240h-232V48h288v160h-1.688l-38.864-98.928a8.001 8.001 0 00-7.448-5.016V104a8 8 0 00-8-8zm-272.533 64.833a31.798 31.798 0 00-7.466-.833c-17.624-.046-31.95 14.203-31.996 31.828a31.912 31.912 0 0013.076 25.844l-29.08 10.816V144h227.064l-147.864 55.032c3.994-17.102-6.632-34.205-23.734-38.199zM112.001 192c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-56.28 112h-7.72v-20.352L55.721 304zm405.92 27.496L132.601 461.6 50.337 244.688 379.425 122.24l82.216 209.256zm2.36-91.496h-21.12l-6.288-16h3.408a8 8 0 008-8V40a8 8 0 00-8-8h-304a8 8 0 00-8 8v56h-16V16h352v224z"
    />
    <path
      fill={color}
      d="M439.481 317.152l-7.632-20a7.823 7.823 0 00-2.68-7.032l-53.688-140.968a7.999 7.999 0 00-10.319-4.639l-.081.031-288 112a8 8 0 00-4.584 10.304l64 168a7.998 7.998 0 007.504 5.152 7.84 7.84 0 002.896-.544l288-112a8 8 0 004.584-10.304zm-277.819-26.028a8 8 0 00-1.645 4.38l-7.792 124.72-3.616 1.4-58.304-153.048L363.393 162.4 407.441 278l-83.648-45.04a8 8 0 00-11.792 7.04v17.048l-59.56-39.704a8 8 0 00-12.368 5.6l-14.32 107.384-52.872-40.664a8 8 0 00-11.219 1.46zm6.987 122.7l6.4-102.32 86.2 66.32-92.6 36zm109.584-42.608a7.526 7.526 0 00-1.352-1.552L240.393 341.6l13.84-103.824 61.328 40.888a8 8 0 0012.44-6.664v-18.608l88.144 47.464 5.552 14.568-143.464 55.792z"
    />
  </svg>
);

IconGallery.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

IconGallery.defaultProps = {
  className: null,
  color: '#000',
  width: 24,
  height: 24
};

export default IconGallery;
