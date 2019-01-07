import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {persistedReducer} from './persistance/persistedReducer';
import {apiMiddleware} from 'redux-api-middleware';
import {jwtMiddleware} from './middleware/rsaaJwtMiddleware';
import {contentTypeMiddleware} from './middleware/rsaaContentTypeMiddleware';
import {endpointMiddleware} from './middleware/rsaaEndpointMiddleware';

// TODO combine RSAA middlewares into one
const enhancer = applyMiddleware(
  thunk,
  jwtMiddleware,
  contentTypeMiddleware,
  endpointMiddleware,
  apiMiddleware,
  logger
);

export const store = createStore(
  persistedReducer,
  enhancer
);
