const request = require('request');
const cheerio = require('cheerio');
const Schedule = require('./../database/scheduleModel');
const moment = require('moment');

var scraperController = {
  scraper: function(req, res, next){

    const url = 'http://www.gohuskies.com/SportSelect.dbml?&DB_OEM_ID=30200&SPID=126619&SPSID=777716';
    request(url, (error, response, html) => {
      var $ = cheerio.load(html);
      var counter = 0;
      var counter2 = 1;
      var scheduleArray = [];
      var databaseScheduleArray = [];
      $('.odd').each(function(i, schedule) {
        var date = $(schedule).find($('.date')).children().text().trim();
            date = date + ', 2016';
        var opponent = $(schedule).find($('.opponent')).text().replace(/\n/g, '').replace(/\t/g, '');
        var time = $(schedule).find($('.time')).text().replace(/\n/g, '').replace(/\t/g, '');
        var year = new Date(date).getFullYear();
        console.log(year);
        if (i >= 6) {
          scheduleArray[counter] = {date: date, opponent: opponent, time: time};
          databaseScheduleArray[counter] = {date: date, opponent: opponent, time: time, year: year};
          counter += 2;
        }
      });

      $('.even').each(function(i, schedule) {
        var date = $(schedule).find($('.date')).children().text().trim();
            date = date + ', 2016';
        var opponent = $(schedule).find($('.opponent')).text().replace(/\n/g, '').replace(/\t/g, '');
        var time = $(schedule).find($('.time')).text().replace(/\n/g, '').replace(/\t/g, '');
        var year = new Date(date).getFullYear();
        var time2 = moment(time, ["h:mm A"]).format("HH:mm");
        // if (time[5] === 'p') {
        //   var hourBeforeColon = time.substring(0, str.indexOf(":"));
        //   var hour = 12 + parseInt(hourBeforeColon);
        //   var twentyFourHrFormat = time.replace(hourBeforeColon, JSON.stringify(hour));
        //   console.log('PMPM', twentyFourHrFormat);
        //
        // } else {
        //   console.log('AMAM', twentyFourHrFormat)
        // }
        if (i >= 6) {
          scheduleArray[counter2] = {date: date, opponent: opponent, time: time};
          databaseScheduleArray[counter2] = {date: date, opponent: opponent, time: time, year: year};
          counter2 += 2;
        }
      });
      // Schedule.create(databaseScheduleArray, function(err, schedule) {
      //   console.log(schedule);
      //   res.send(scheduleArray);
      // });
      res.send(scheduleArray);

    });
  }
}

module.exports = scraperController;
