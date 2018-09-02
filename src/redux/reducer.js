import { SET_USER, SET_SPELL } from './constants';

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
    default:
      return state;
  }
}
