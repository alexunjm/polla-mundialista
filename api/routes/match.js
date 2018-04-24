'use strict'

var express = require('express');

var MatchController = require('../controllers/match');
var md_auth = require('../middlewares/authentication');

var api = express.Router();

api.get("/match/insert", MatchController.insertMatches);
api.get("/match/insert/year/:year?/stage/:stage?", MatchController.insertMatches);
api.get("/match/:id", md_auth.ensureAuth, MatchController.getMatch);
api.get("/matches/:page?", md_auth.ensureAuth, MatchController.getMatches);
api.get("/matches/page/:page?", md_auth.ensureAuth, MatchController.getMatches);
api.get("/matches/page/:page/items-per-page/:itemsPerPage?", md_auth.ensureAuth, MatchController.getMatches);

module.exports = api;