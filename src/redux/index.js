import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createWsMiddleware from '@giantmachines/redux-websocket';

import config from '../config';
import app from './app/reducer';
import posts from './posts/reducer';

import createApiMiddleware from './middlewares/createApiMiddleware';

const createRootReducer = (history) => combineReducers({
  app,
  posts,

  router: connectRouter(history)
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'app'
  ]
};

function configureStore(history, initialState) {
  const middlewares = [
    thunkMiddleware,
    createApiMiddleware({
      protocol: config.API_PROTOCOL,
      host: config.API_HOST,
      apiPath: config.API_PATH
    }),
    createWsMiddleware(),
    routerMiddleware(history)
  ];

  const composeEnhancers = composeWithDevTools({ name: 'InstaExport' });
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  const rootReducer = createRootReducer(history);
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    enhancers
  );

  const persistor = persistStore(store);

  return {
    persistor,
    store
  };
}

export default configureStore;
