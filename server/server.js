const path = require('path');
const express = require('express');
const app = express();
const scraperController = require('./scraper');
const moment = require('moment');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UWSoftballSchedule');
mongoose.connection.once('open', function() {
  console.log('Connected with MongoDB UW Softball Schedule');
});

app.use(express.static(path.join(__dirname, './../')));



app.set('view engine', 'ejs');

app.get('/', function(req,res) {
  res.sendFile('/index.html');
});
app.get('/schedule', scraperController.scraper);

console.log(typeof moment().format('MMM Do, YYYY'));

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
