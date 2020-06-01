export const noop = () => {};

export const createArray = (length, iterator = () => null) => Array.from({ length }, iterator);
