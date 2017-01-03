import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Welcome from './components/Welcome';
import TimeLog from './components/TimeLog';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Welcome} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/time-log" component={TimeLog} />
    </Router>
  );
};

export default Routes;
