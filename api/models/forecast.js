'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ForecastSchema = Schema({
  match: { type: Schema.ObjectId, ref: "Matche" },
  user: { type: Schema.ObjectId, ref: "User" },
  home: Number,
  away: Number,
  last_update: String
});

module.exports = mongoose.model('Forecast', ForecastSchema);