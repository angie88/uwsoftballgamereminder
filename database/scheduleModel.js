const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  date: String,
  time: String,
  opponent: String,
  year: Number
})

module.exports = mongoose.model('Schedule', scheduleSchema);
