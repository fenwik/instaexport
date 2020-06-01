import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import './loadFonts';

import SentryWrapper from '../components/SentryWrapper';
import Layout from '../components/Layout';
import Router from './Router';

import '../style/index.scss';

const App = ({
  persistor,
  history,
  store
}) => (
  <SentryWrapper>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Layout>
            <Router />
          </Layout>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </SentryWrapper>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default memo(App);
