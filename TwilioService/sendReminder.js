const configTwilio = require('config').get('twilio');
const accountSid = configTwilio.accountSid;
const authToken = configTwilio.authToken;
const client = require('twilio')(accountSid, authToken);
const mongoose = require('mongoose');
const Schedule = require('./../database/scheduleModel');
const moment = require('moment');

var checkTimeAndSendReminder = {};
checkTimeAndSendReminder.querySchedule = querySchedule;
checkTimeAndSendReminder.sendReminder = sendReminder;

function querySchedule () {
  var date = moment().format('MMM Do, YYYY');
  Schedule.find({date: 'Feb 12, 2016'}, function(err, games) {
    console.log(games);
  });
};

function sendReminder(phoneNumber, message) {
  client.messages.create({
    to: configTwilio.number,
    from: configTwilio.twilioNumber,
    body: 'Hey'
  }, function(err, message) {
    console.log(message.sid);
  });
};

module.exports = checkTimeAndSendReminder;
