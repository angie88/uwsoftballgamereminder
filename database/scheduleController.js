const mongoose = require('mongoose');
const Schedule = require('./scheduleModel');

module.exports = {
  saveSchedule: function(req, res, next) {
    Schedule.find({year: new Date(Date.now()).getFullYear()}, function(err, schedule) {
      if (schedule.length === 0) next();
      else {
        res.send(schedule);
      }
    });
  }
}
