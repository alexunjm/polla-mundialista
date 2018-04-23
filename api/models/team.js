'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = Schema({
	name: String,
});

module.exports = mongoose.model('Team', TeamSchema);