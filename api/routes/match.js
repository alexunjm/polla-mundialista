'use strict'

var express = require('express');

var MatchLoaderController = require("../controllers/match-loader");
var MatchController = require('../controllers/match');
var md_auth = require('../middlewares/authentication');

var api = express.Router();

api.get("/match/insert", MatchLoaderController.insertMatches);
api.get("/match/insert/stage/:stage?", MatchLoaderController.insertMatches);
api.get("/match/insert/stage/:stage?/year/:year?", MatchLoaderController.insertMatches);
api.post("/match/insert/tmp/:tmp?", MatchLoaderController.insertMatches);
api.post("/match/insert/stage/:stage?/tmp/:tmp?", MatchLoaderController.insertMatches);
api.get("/match/:id", md_auth.ensureAuth, MatchController.getMatch);
api.get("/matches/:page?", md_auth.ensureAuth, MatchController.getMatches);
api.get("/matches/page/:page?", md_auth.ensureAuth, MatchController.getMatches);
api.get("/matches/page/:page/items-per-page/:itemsPerPage?", md_auth.ensureAuth, MatchController.getMatches);
api.get("/matches/stage/:stage?", md_auth.ensureAuth, MatchController.getMatches);

module.exports = api;