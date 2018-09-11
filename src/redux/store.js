import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

const devMiddleware = () =>
  process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

export default createStore(
  reducer,
  {
    authUser: null,
    spell: null,
    monster: null,
    character: null,
  },
  devMiddleware()
);
