const mongoose = require('mongoose');
const Schedule = require('./scheduleModel');

module.exports = {
  saveSchedule: function(req, res, next) {
    Schedule.find({year: new Date(Date.now()).getFullYear()}, function(err, schedule) {
      if (!schedule.length) next();
      else {
        console.log(schedule);
        res.send(schedule);
      }
    });
  }
}
