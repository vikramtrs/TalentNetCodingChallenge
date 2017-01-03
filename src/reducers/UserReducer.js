import { SET_USER } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
