'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemporalSchema = Schema({
  year: Number,
  stage: String,
  matches: Array
});

module.exports = mongoose.model('Temporal', TemporalSchema);