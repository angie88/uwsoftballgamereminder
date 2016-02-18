const configTwilio = require('config').get('twilio');
const accountSid = configTwilio.accountSid;
const authToken = configTwilio.authToken;
const client = require('twilio')(accountSid, authToken);
const mongoose = require('mongoose');
const Schedule = require('./../database/scheduleModel');
const moment = require('moment');
const CronJob = require('cron').CronJob;

var checkTimeAndSendReminder = {};
checkTimeAndSendReminder.querySchedule = querySchedule;
checkTimeAndSendReminder.sendReminder = sendReminder;

function querySchedule () {
  var date = moment().format('MMM Do, YYYY');
  Schedule.find({date: 'Feb 19, 2016'}, function(err, games) {
    if (games.length > 0) {
      var time = games[1].twentyFourHour;
      var message = games.map(function(game) {
        return {time: game.time, opponent: game.opponent};
      });
      sendText(message)
      //sendReminder(123, message, games[0].twentyFourHour);
    }
  });
};

function sendText(message) {

  console.log('being called???')
  var string = "It's game day! Game time is ";
  var string2 = "We're taking on ";
  message.forEach(function(elem, i){
    if (i < 1) {
      string += elem.time;
      string2 += elem.opponent;
    }
    if (i > 0) {
      string += `, ${elem.time}`;
      string2 += `, ${elem.opponent}`;
    }
  });
  var textMessage = string + string2 + '. Go Dawgs!';
  client.messages.create({
    to: configTwilio.number,
    from: configTwilio.twilioNumber,
    body: textMessage
  }, function(err, message) {
    console.log(message.sid);
  });

}

function sendReminder(phoneNumber, message, time) {
  var string = "It's game day! Game time is ";
  var string2 = "We're taking on ";
  message.forEach(function(elem, i){
    if (i < 1) {
      string += elem.time;
      string2 += elem.opponent;
    }
    if (i > 0) {
      string += `, ${elem.time}`;
      string2 += `, ${elem.opponent}`;
    }
  });
  var textMessage = string + string2 + '. Go Dawgs!';
  console.log(textMessage);
  var counter = 0
  var job = new CronJob('* 33 17 17 1 *', function(){
    counter++;
    if (counter < 2) {
      client.messages.create({
        to: configTwilio.number,
        from: configTwilio.twilioNumber,
        body: textMessage
      }, function(err, message) {
        console.log(message.sid);
      });
    }

  }, null, true, 'America/Los_Angeles');

};


module.exports = checkTimeAndSendReminder;
