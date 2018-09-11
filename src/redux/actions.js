import { SET_SPELL, SET_USER, SET_MONSTER, SET_CHARACTER } from './constants';

export const setLoggedInUser = user => dispatch => dispatch({ type: SET_USER, payload: user });

export const setSpell = spell => dispatch => dispatch({ type: SET_SPELL, payload: spell });

export const setMonster = monster => dispatch => dispatch({ type: SET_MONSTER, payload: monster });

export const setCharacter = character => dispatch => dispatch({ type: SET_CHARACTER, payload: character });
