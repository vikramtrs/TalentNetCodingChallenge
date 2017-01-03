import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import TimeLogReducer from './TimeLogReducer';
import DateReducer from './DateReducer';

const rootReducer = combineReducers({
  form,
  auth: AuthReducer,
  user: UserReducer,
  timeLogs: TimeLogReducer,
  date: DateReducer
});

export default rootReducer;
