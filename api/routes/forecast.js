'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var ForecastController = require('../controllers/forecast');
var md_auth = require('../middlewares/authentication');
var md_upload = multipart({uploadDir: './uploads/forecasts'});

var api = express.Router();

api.post("/forecast/save", md_auth.ensureAuth, ForecastController.saveForecast);
api.get('/forecast/:id', md_auth.ensureAuth, ForecastController.getForecast);
api.get('/forecasts/:page?', md_auth.ensureAuth, ForecastController.getForecasts);


module.exports = api;