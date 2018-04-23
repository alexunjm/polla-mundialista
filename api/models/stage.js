'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StageSchema = Schema({
	name: String,
});

module.exports = mongoose.model('Stage', StageSchema);