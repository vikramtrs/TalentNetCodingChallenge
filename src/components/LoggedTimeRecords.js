import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoggedTimeRecords extends Component {
  render() {
    return (
      <table className="table-bordered" style={{ marginTop: 20 }}>
        <thead>
          <tr><th colSpan={3}>Records</th></tr>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.timeLogs.map((timeLog, index) => {
              let selectedDate;
              if (!this.props.date.selectedDate) {
                const d = new Date();
                selectedDate = d.toString('YYYY-MM-DD');
              } else {
                selectedDate = this.props.date.selectedDate;
              }

              if (timeLog.date === selectedDate) {
                return (
                  <tr key={index}>
                    <td>{timeLog.timeFrom.toString('HH:mm')}</td>
                    <td>{timeLog.timeTo.toString('HH:mm')}</td>
                    <td>{timeLog.description}</td>
                  </tr>
                );
              }
            })
          }
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

export default connect(mapStateToProps)(LoggedTimeRecords);
