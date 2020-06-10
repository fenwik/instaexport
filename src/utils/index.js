export const noop = () => {};

export const createArray = (length, iterator = () => null) => Array.from({ length }, iterator);

export const isFunction = (func) => func && {}.toString.call(func) === '[object Function]';

export const detectColorScheme = () => (
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
);
