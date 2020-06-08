import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  memo
} from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../utils';

const INTERVAL_DURATION = 50;

const AppearCursor = ({
  offset,
  onAppear,
  onDisappear
}) => {
  const ref = useRef(null);
  const interval = useRef(null);
  const [onScreen, setOnScreen] = useState(false);

  const checkOnScreen = useCallback(() => {
    const { top } = ref.current.getBoundingClientRect();
    const isOnScreen = (top - offset < window.innerHeight) && (top > -offset);

    if (isOnScreen === onScreen) {
      return;
    }

    setOnScreen(isOnScreen);

    if (isOnScreen) {
      onAppear();
    } else {
      onDisappear();
    }
  }, [offset, onScreen, onAppear, onDisappear]);

  useEffect(() => {
    interval.current = setInterval(checkOnScreen, INTERVAL_DURATION);

    return () => {
      clearInterval(interval.current);
    };
  }, [checkOnScreen]);

  useEffect(() => () => {
    clearInterval(interval.current);
  }, []);

  return (
    <div
      ref={ref}
      style={{ height: 1 }}
    />
  );
};

AppearCursor.propTypes = {
  offset: PropTypes.number,
  onAppear: PropTypes.func,
  onDisappear: PropTypes.func
};

AppearCursor.defaultProps = {
  offset: 0,
  onAppear: noop,
  onDisappear: noop
};

export default memo(AppearCursor);
