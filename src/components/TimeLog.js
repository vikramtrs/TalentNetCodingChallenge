import React from 'react';

import TimeLogHeader from './TimeLogHeader';
import TimeLogForm from './TimeLogForm';
import LoggedTimeRecords from './LoggedTimeRecords';

const TimeLog = () => {
  return (
    <div>
      <TimeLogHeader />
      <TimeLogForm />
      <LoggedTimeRecords />
    </div>
  );
};

export default TimeLog;
