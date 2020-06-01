import React, { memo } from 'react';
import PropTypes from 'prop-types';

import style from './Layout.scss';

const Layout = ({ children }) => (
  <div className={style.component}>
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};

export default memo(Layout);
