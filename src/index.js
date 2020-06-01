import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { setConfiguration } from 'react-grid-system';
import * as Sentry from '@sentry/browser';

import { unregister } from './serviceWorker';
import history from './clientHistory';
import configureStore from './redux';
import config from './config';
import App from './app';

if (config.SENTRY_DSN) {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    blacklistUrls: [
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extensions:\/\//i
    ]
  });
}

setConfiguration({
  breakpoints: [576, 768, 1000, 1300],
  containerWidths: [570, 760, 980, 1260],
  gutterWidth: 20
});

const { store, persistor } = configureStore(history, window.__data); // eslint-disable-line no-underscore-dangle

unregister();

ReactDOM.render(
  <App
    persistor={persistor}
    store={store}
    history={history}
  />,
  document.getElementById('root')
);
