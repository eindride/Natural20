import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

const devMiddleware = () => process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);
/* eslint-disable */

export const store = createStore(reducer, {
  authUser: null,
  characterName: '',
  race: '',
  characterClass: '',
  background: '',
  alignment: '',
  level: null,
  strengthTotal: 0,
  dexterityTotal: 0,
  constitutionTotal: 0,
  intelligenceTotal: 0,
  wisdomTotal: 0,
  charismaTotal: 0,
  skills: [],
  armor: [],
  weaponProficiencies: [],
  tools: [],
  weapons: [],
  equipment: [],
}, devMiddleware());
