const React = require('react');
const $ = require('jquery');
const ScheduleData = require('./scheduledivs')

var Schedule = React.createClass({
  getInitialState: function(){
    return {schedule: ''};
  },
  componentDidMount: function() {
    $.get('/schedule', function(schedule) {
      console.log(schedule);
      this.setState({schedule: schedule});
    }.bind(this));
  },

  formPhoneNumber: function(e) {
    e.preventDefault();
    console.log('phone number', $('#phone').val());
    console.log(arguments);
  },

  render: function () {

    return (
      <div id='Schedule'>
        <ScheduleData schedule={this.state.schedule}/>
      </div>
    )
  }
});


module.exports = Schedule;
