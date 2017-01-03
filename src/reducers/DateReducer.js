import { SET_SELECTED_DATE } from '../actions/types';

export default function (state = '', action) {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}
