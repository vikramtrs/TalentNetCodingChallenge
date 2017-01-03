import { CREATE_TIME_LOG, POPULATE_TIME_LOGS, REMOVE_TIME_LOGS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_TIME_LOG:
      return [...state, action.payload];
    case POPULATE_TIME_LOGS:
      return [...state, ...action.payload];
    case REMOVE_TIME_LOGS:
      return [{}];
    default:
      return state;
  }
}
