const mongoose = require('mongoose');
const Schedule = require('./scheduleModel');

module.exports = {
  saveSchedule: function() {
    Schedule.find({}, function(err, schedule) {
      console.log(err);
    });
  }
}
