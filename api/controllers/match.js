'use strict'

const mongoosePaginate = require('mongoose-pagination');
const moment = require("moment");

const Match = require("../models/match");
const Team = require("../models/team");
const Temporal = require("../models/temporal");
const Stage = require("../models/stage");
const async = require("async");

/** Obtener datos de un partido */
const getMatch = (req, res) => {
	const matchId = req.params.id;

	Match.findById(matchId, (err, match) => {
		if(err) return res.status(500).send({status: 'error', message: 'Error en la petición'});

		if(!match) return res.status(404).send({status: 'error', message: 'El partido no existe'});

		return res.status(200).send({match});
	});
};

const findData = (matches, cbFD) => {
	async.map(matches, 
		(match, cb) => {
			async.parallel({
				stage: (_cb) => {
					Stage.findById(match.stage, (err, stage) => err ? _cb(err) : _cb(null, stage));
				},
				home_team: (_cb) => {
					Team.findById(match.home_team, (err, team) => err ? _cb(err) : _cb(null, team));
				},
				away_team: (_cb) => {
					Team.findById(match.away_team, (err, team) => (err ? _cb(err) : _cb(null, team)));
				}
			}, (error, data) => {
				if (error) cb(error);
		
				match.stage = data.stage;
				match.home_team = data.home_team;
				match.away_team = data.away_team;
				cb(null, match);
			});

		},
		(error, data) => {
			if (error) cbFD(error);

			cbFD(null, data);
		}
	);
}

/** Devolver un listado de partidos paginado */
const getMatches = (req, res) => {
	const identityUserId = req.user.sub;
	const page = 1;
	if(req.params.page) {
		page = req.params.page;
	}
	const itemsPerPage = 5;
	if (req.params.itemsPerPage) {
		itemsPerPage = req.params.itemsPerPage;
	}

	Match.find().sort('_id').paginate(page, itemsPerPage, (err, matches, total) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!matches) return res.status(404).send({ status: 'error', message: 'No hay partidos disponibles' });
		
		findData(matches, (error, result) => {
			if (error) return res.status(500).send({ status: 'error', message: error });

			return res.status(200).send({ matches: result, total, pages: Math.ceil(total/itemsPerPage) });
		});
	});
}

const mapMatches = (results) => {
	if (results && results.length && results[0].matches)
		return results[0].matches.map(match => {
			const [home, away] = match.split(" - ");
			return { home, away };
		});
	else {
		console.log(results);
		return results;
	}
};

const findTeam = (callback, nameStartsWith) =>
  Team.findOne({ name: { $regex: new RegExp(`^${nameStartsWith}`) } }).exec(
    (err, team) => (err ? callback(err) : callback(null, team))
  );

const saveStage = (stage, cb) => {
	Stage.findOne({name: stage.name}).exec(
		(err, foundStage) => {
			if(err) return cb({status: 'error', message: 'Error de conexión a la bd', err}, 500);

			if(foundStage) return cb(null, { status: 'ok', stage: foundStage}, 200);

			stage.save((err, stageStored) => {
				if (err) return cb({ status: 'error', message: 'Error al guardar la fase'}, 500);
		
				if(stageStored) return cb(null, { status: 'ok', stage: stageStored});
				return cb({status: 'error', message: 'No se pudo registrar la fase'}, 404);
			});
		}
	);
};

const saveMatch = (match, stage, cb) => {
	const matchObj = new Match();
	matchObj.home_team = match.detail.home._id;
	matchObj.away_team = match.detail.away._id;
	matchObj.stage = stage._id;
	matchObj.date = moment().unix();
	/**
	 * guardar partido antes de responder
	 */
	matchObj.save((err, matchStored) => {
		if (err) return cb({ status: 'error', message: 'Error al guardar el partido', matchObj }, 500);

		if (matchStored) return cb(null, matchStored);
		return cb({ status: 'error', message: 'No se pudo registrar el partido', matchObj }, 404);
	});
};

const insertMatches = (req, res) => {
	var year = 2018;
	if(req.params.year) {
		year = req.params.year;
	}
	var stage = "group stage";
	if (req.params.stage) {
		stage = req.params.stage;
	}

	var stageObj = new Stage();
	stageObj.name = stage.charAt(0).toUpperCase() + stage.slice(1);
	saveStage(stageObj, (err, savedStage) => {
		if(err) return res.status(savedStage).send(err);
		
		async.waterfall([
			(cb) => 
				Temporal.find({ year, stage}).exec((err, results) => {
					if (err) cb(err);
			
					if (!(results && results.length)) {
						return res.status(404).send({
							status: 'error',
							message: 'No hay temporales disponibles' 
						});
					}
					cb(null, results);
				}),
			(results, cb) => cb(null, mapMatches(results)),
			(matches, cb) => {
				async.map(matches, (match, cbMap) =>
					async.series({
							home: callback => findTeam(callback, match.home),
							away: callback => findTeam(callback, match.away)
						}, (err, matchRes) => err ? cbMap(err) : saveMatch({detail: matchRes, match}, savedStage.stage, cbMap)
					), (error, result) => error ? cb(error) : cb(null, result));
			},
		], (error, data) => {
			if(error) return res.status(500).send({ status: 'error', message: 'Error en la petición', error });
			
			return err ? res.status(404).send(err) : res.status(200).send({ data, savedStage });
		});
	});
};

module.exports = {
	getMatch,
	getMatches,
	insertMatches
};