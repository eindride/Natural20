import { SET_USER, SET_SPELL, SET_MONSTER, SET_CHARACTER } from './constants';

export default function(state, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        authUser: action.payload,
      };
    case SET_SPELL:
      return {
        ...state,
        spell: action.payload,
      };
    case SET_MONSTER:
      return {
        ...state,
        monster: action.payload,
      };
    case SET_CHARACTER:
      return {
        ...state,
        character: action.payload,
      };
    default:
      return state;
  }
}
