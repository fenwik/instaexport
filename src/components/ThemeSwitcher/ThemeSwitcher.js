import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { noop } from '../../utils';

import style from './ThemeSwitcher.scss';

const ThemeSwitcher = ({
  className,
  theme,
  onToggle
}) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const isOn = theme === 'dark';

  return (
    <div className={cn(style.component, className)}>
      <input
        checked={isOn}
        className={style.checkbox}
        id="react-switch-new"
        type="checkbox"
        onChange={onToggle}
      />

      <label
        className={style.label}
        htmlFor="react-switch-new"
      >
        <span className={style.button} />
      </label>
    </div>
  );
};

ThemeSwitcher.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
  onToggle: PropTypes.func
};

ThemeSwitcher.defaultProps = {
  className: '',
  theme: '',
  onToggle: noop
};

export default memo(ThemeSwitcher);
