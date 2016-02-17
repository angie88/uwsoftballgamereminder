const React = require('react');
const $ = require('jquery');

var ScheduleData = React.createClass({
  schedule: function() {
    var schedule = this.props.schedule,
        array = [];
    $.each(schedule, (i, elem) => {
      array.push(<tr key={i} className='schedule'><td>{elem.date}</td><td>{elem.time}</td><td>{elem.opponent}</td></tr>);
    });
    return array;
  },

  render: function () {

    return (
      <table id='ScheduleData'>
        <tbody>
          {this.schedule()}
        </tbody>
      </table>
    )
  }
});



module.exports = ScheduleData;
