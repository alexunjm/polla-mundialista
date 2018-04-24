'use strict'

var express = require('express');

var TeamController = require('../controllers/team');
var md_auth = require('../middlewares/authentication');

var api = express.Router();

api.get("/teams/:page?", md_auth.ensureAuth, TeamController.getTeams);
api.get("/teams/page/:page?", md_auth.ensureAuth, TeamController.getTeams);
api.get('/teams/page/:page/items-per-page/:itemsPerPage?', md_auth.ensureAuth, TeamController.getTeams);

module.exports = api;