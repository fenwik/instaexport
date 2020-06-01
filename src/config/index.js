import merge from 'deepmerge';

const defaultConfig = {
  APP_PROTOCOL: '',
  APP_HOST: '',

  API_PROTOCOL: '',
  API_HOST: '',
  API_PATH: '/api/',

  SENTRY_DSN: ''
};

let runtimeConfig = {};

/* eslint-disable no-underscore-dangle */
if (typeof window !== 'undefined' && window.__config && typeof window.__config === 'object') {
  runtimeConfig = window.__config;
} else if (typeof process !== 'undefined' && process.env) {
  runtimeConfig = Object.keys(defaultConfig).reduce((prev, key) => {
    const value = process.env[key];

    if (typeof value === 'undefined') {
      return prev;
    }

    return {
      ...prev,
      [key]: process.env[key]
    };
  }, {});
}

const config = merge(defaultConfig, runtimeConfig);

export default config;
