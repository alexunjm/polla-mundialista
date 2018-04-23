'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = Schema({
  match: { type: Schema.ObjectId, ref: "Matche" },
  user: { type: Schema.ObjectId, ref: "User" },
  home: number,
  away: number,
  last_update: String
});

module.exports = mongoose.model('Result', ResultSchema);