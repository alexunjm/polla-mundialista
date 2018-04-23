'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = Schema({
  name: String,
  home_team: { type: Schema.ObjectId, ref: "Team" },
  away_team: { type: Schema.ObjectId, ref: "Team" },
  stage: { type: Schema.ObjectId, ref: "Stage" },
  date: String
});

module.exports = mongoose.model('Matche', MatchSchema);