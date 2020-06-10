import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { noop, detectColorScheme } from '../../utils';

import style from './ThemeSwitcher.scss';

const ThemeSwitcher = ({
  className,
  theme,
  setTheme,
  toggleTheme
}) => {
  useEffect(() => {
    if (!theme) {
      setTheme(detectColorScheme());
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [
    theme,
    setTheme
  ]);

  return (
    <div className={cn(style.component, className)}>
      <input
        checked={theme === 'dark'}
        className={style.checkbox}
        id="react-switch-new"
        type="checkbox"
        onChange={toggleTheme}
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
  setTheme: PropTypes.func,
  toggleTheme: PropTypes.func
};

ThemeSwitcher.defaultProps = {
  className: '',
  theme: '',
  setTheme: noop,
  toggleTheme: noop
};

export default memo(ThemeSwitcher);
