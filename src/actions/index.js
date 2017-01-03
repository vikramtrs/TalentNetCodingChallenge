import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  SET_USER,
  CREATE_TIME_LOG,
  SET_SELECTED_DATE,
  POPULATE_TIME_LOGS,
  REMOVE_TIME_LOGS
} from './types';

export function signinUser(firstname, lastname, email) {
  return function (dispatch) {
    localStorage.setItem('userFirstName', firstname);
    localStorage.setItem('userLastName', lastname);
    localStorage.setItem('userEmail', email);

    const timeLogs = JSON.parse(localStorage.getItem(email));

    dispatch({ type: AUTH_USER });
    dispatch({ type: SET_USER, payload: { firstname, lastname, email } });

    if (timeLogs) {
      dispatch({ type: POPULATE_TIME_LOGS, payload: timeLogs });
    }

    browserHistory.push('/time-log');
  };
}

export function signoutUser(email, timeLogs) {
  return function (dispatch) {
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userEmail');

    localStorage.setItem(email, JSON.stringify(timeLogs));

    dispatch({ type: REMOVE_TIME_LOGS });
    dispatch({ type: UNAUTH_USER });

    browserHistory.push('/');
  };
}

export function createTimeLog({ date, timeFrom, timeTo, description }) {
  return function (dispatch) {
    const formattedTimeFrom = timeFrom.format('YYYY-MM-DD HH:mm');
    const formattedTimeTo = timeTo.format('YYYY-MM-DD HH:mm');

    dispatch({
      type: CREATE_TIME_LOG,
      payload: { date, timeFrom: formattedTimeFrom, timeTo: formattedTimeTo, description }
    });
  };
}

export function setSelectedDate(date) {
  return function (dispatch) {
    dispatch({ type: SET_SELECTED_DATE, payload: date });
  };
}
