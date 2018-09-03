import { SET_SPELL, SET_USER } from './constants';

export const setLoggedInUser = user => dispatch => dispatch({ type: SET_USER, payload: user });

export const setSpell = spell => dispatch => dispatch({ type: SET_SPELL, payload: spell });
