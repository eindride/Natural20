import { SET_USER, SET_SPELL, SET_MONSTER } from './constants';

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
    default:
      return state;
  }
}
