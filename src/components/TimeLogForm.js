import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import * as actions from '../actions';

class TimeLogForm extends Component {
  state = {
    date: '',
    timeFrom: '',
    timeTo: '',
    description: ''
  };

  handleDateChange(date) {
    this.setState({ date });
    this.props.setSelectedDate(date);
  }

  handleSubmit() {
    const { date, timeFrom, timeTo, description } = this.state;

    if (!date) {
      document.querySelector('.date').style.border = '2px solid red';
    } else {
      document.querySelector('.date').style.border = '';
    }

    if (!timeFrom) {
      document.querySelector('.timeFrom').style.border = '2px solid red';
    } else {
      document.querySelector('.timeFrom').style.border = '';
    }

    if (!timeTo) {
      document.querySelector('.timeTo').style.border = '2px solid red';
    } else {
      document.querySelector('.timeTo').style.border = '';
    }

    if (timeFrom >= timeTo) {
      document.querySelector('.timeFrom').style.border = '2px solid red';
      document.querySelector('.timeTo').style.border = '2px solid red';
    } else {
      document.querySelector('.timeFrom').style.border = '';
      document.querySelector('.timeTo').style.border = '';
    }

    if (!description) {
      document.querySelector('.description').style.border = '2px solid red';
    } else {
      document.querySelector('.description').style.border = '';
    }

    if (date && timeFrom && timeTo && description && timeFrom < timeTo) {
      let isValid = true;

      this.props.timeLogs.map(timeLog => {
        if (timeLog.date === this.props.date.selectedDate) {
          if (moment(timeLog.timeFrom, 'YYYY-MM-DD HH:mm') === timeFrom
              || moment(timeLog.timeTo, 'YYYY-MM-DD HH:mm') === timeTo) {
            isValid = false;
          }

          if (moment(timeLog.timeTo, 'YYYY-MM-DD HH:mm') >= timeFrom
              && moment(timeLog.timeFrom, 'YYYY-MM-DD HH:mm') <= timeTo) {
            isValid = false;
          }
        }
      });

      if (isValid === false) {
        document.querySelector('.timeFrom').style.border = '2px solid red';
        document.querySelector('.timeTo').style.border = '2px solid red';
      } else {
        document.querySelector('.timeFrom').style.border = '';
        document.querySelector('.timeTo').style.border = '';

        this.props.createTimeLog({ date, timeFrom, timeTo, description });
      }
    }
  }

  render() {
    return (
      <table className="table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Description</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <DateField
                className="date"
                dateFormat="YYYY-MM-DD"
                onChange={date => this.handleDateChange(date)}
              />
            </td>
            <td>
              <TimePicker
                className="timeFrom"
                showSecond={false}
                onChange={timeFrom => this.setState({ timeFrom })}
              />
            </td>
            <td>
              <TimePicker
                className="timeTo"
                showSecond={false}
                onChange={timeTo => this.setState({ timeTo })}
              />
            </td>
            <td style={{ paddingTop: 5 }}>
              <textarea
                id="description"
                className="description"
                onChange={() => this.setState({
                                  description: document.getElementById('description').value
                                })}
              />
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={this.handleSubmit.bind(this)}
              >
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ timeLogs, date }) => {
  return {
    timeLogs,
    date
  };
};

export default connect(mapStateToProps, actions)(TimeLogForm);
