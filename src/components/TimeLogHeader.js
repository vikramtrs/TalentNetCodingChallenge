import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Clock from 'react-clock';

import * as actions from '../actions';

class TimeLogHeader extends Component {

  getTotalHoursTracked() {
    let minutes = 0;
    this.props.timeLogs.forEach(timeLog => {
      const diff = moment.duration(moment(timeLog.timeTo, 'YYYY-MM-DD HH:mm')
                   .diff(moment(timeLog.timeFrom, 'YYYY-MM-DD HH:mm')));
      minutes += parseInt(diff.asMinutes(), 0);
    });
    const h = parseInt(minutes / 60, 0);
    const m = parseInt(minutes % 60, 0);
    return (`${h} hours, ${m} minutes`);
  }

  render() {
    const { firstname, lastname } = this.props.user.userInfo;
    let date = new Date();
    setInterval(() => { date = new Date(); }, 1000);

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><a style={{ color: '#000' }}><strong>{firstname} {lastname}</strong></a></li>
            <li>
              <a style={{ color: '#000' }}>
                <strong>Total hours tracked: { this.getTotalHoursTracked() }</strong>
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a style={{ color: '#000', paddingRight: 0 }}>
                <strong>{date.toDateString()}</strong>
              </a>
            </li>
            <li><a style={{ color: '#000', paddingLeft: 0 }}><strong><Clock /></strong></a></li>
            <li>
              <a
                className="btn btn-danger logout"
                onClick={() =>
                  this.props.signoutUser(this.props.user.userInfo.email, this.props.timeLogs)}
              >
                <strong>Logout</strong>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ user, timeLogs }) => {
  return {
    user,
    timeLogs
  };
};

export default connect(mapStateToProps, actions)(TimeLogHeader);
