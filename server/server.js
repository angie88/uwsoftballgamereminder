const path = require('path');
const express = require('express');
const app = express();
const scraperController = require('./scraper');
const mongoose = require('mongoose');
const scheduleController = require('./../database/scheduleController');
const Schedule = require('./../database/scheduleModel');
const twilioService = require('./../TwilioService/sendReminder.js');
const moment = require('moment');





mongoose.connect('mongodb://localhost/UWSoftballSchedule');
mongoose.connection.once('open', function() {
  console.log('Connected with MongoDB UW Softball Schedule');
});

app.use(express.static(path.join(__dirname, './../')));



app.set('view engine', 'ejs');

app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

app.get('/schedule', scheduleController.saveSchedule, scraperController.scraper);

app.get('/getText', function(req, res) {
  twilioService.querySchedule();
  res.redirect('/')
})
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});





setInterval(function(){twilioService.querySchedule()}, 60000);
