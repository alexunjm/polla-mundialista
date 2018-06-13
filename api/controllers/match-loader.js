'use strict'

const moment = require("moment");
const Match = require("../models/match");
const Team = require("../models/team");
const Temporal = require("../models/temporal");
const Stage = require("../models/stage");
const async = require("async");

const saveStage = (stage, cb) => {
	Stage.findOne({ name: stage.name }).exec(
		(err, foundStage) => {
			if (err) return cb({ status: 'error', message: 'Error de conexión a la bd', err }, 500);

			if (foundStage) return cb(null, { status: 'ok', stage: foundStage }, 200);

			stage.save((err, stageStored) => {
				if (err) return cb({ status: 'error', message: 'Error al guardar la fase' }, 500);

				if (stageStored) return cb(null, { status: 'ok', stage: stageStored });
				return cb({ status: 'error', message: 'No se pudo registrar la fase' }, 404);
			});
		}
	);
};

const mapMatches = (results) => {
	if (results && results.length && results[0].matches)
		return results[0].matches.map(elm => {
			const [home, away] = elm.match.split(" - ");
			let date = new Date(elm.date.y, elm.date.m, elm.date.d, elm.date.h);
			const rta = { home, away, date };
			return rta;
		});
	else {
		return results;
	}
};

const findTeam = (callback, nameStartsWith) =>
	Team.findOne({ name: { $regex: new RegExp(`^${nameStartsWith}`) } }).exec(
		(err, team) => (err ? callback(err) : callback(null, team))
	);

const saveMatch = (match, stage, cb) => {
	const matchObj = new Match();
	matchObj.home_team = match.detail.home._id;
	matchObj.away_team = match.detail.away._id;
	matchObj.stage = stage._id;
	matchObj.date = moment().unix();
	//guarda el partido
	matchObj.save((err, matchStored) => {
		if (err) return cb({ status: 'error', message: 'Error al guardar el partido', matchObj }, 500);

		if (matchStored) return cb(null, matchStored);
		return cb({ status: 'error', message: 'No se pudo registrar el partido', matchObj }, 404);
	});
};

const insertMatches = (req, res) => {
	let year = 2018;
	if (req.params.year) {
		year = req.params.year;
	}
	let stage = "group stage";
	if (req.params.stage) {
		stage = req.params.stage;
	}
	if(req.body) {

		const jsonData = req.body;
		if (jsonData.year) {
			year = jsonData.year;
		}
		if (jsonData.stage) {
			stage = jsonData.stage;
		}
	}

	let stageObj = new Stage();
	stageObj.name = stage.charAt(0).toUpperCase() + stage.slice(1);
	saveStage(stageObj, (err, savedStage) => {
		if (err) return res.status(savedStage).send(err);

		async.waterfall([
			(cb) =>
				"t" == req.params.tmp ?
				Temporal.find({ year, stage }).exec((err, results) => {
					if (err) cb(err);

					if (!(results && results.length)) {
						return res.status(404).send({
							status: 'error',
							message: 'No hay temporales disponibles'
						});
					}
					cb(null, results);
				}):
				cb(null, [req.body]),
			(results, cb) => cb(null, mapMatches(results)),
			(matches, cb) => {
				async.map(matches, (match, cbMap) =>
					async.series({
						home: callback => findTeam(callback, match.home),
						away: callback => findTeam(callback, match.away)
					}, (err, matchRes) => err ? cbMap(err) : saveMatch({ detail: matchRes, match }, savedStage.stage, cbMap)
					), (error, result) => error ? cb(error) : cb(null, result));
			},
		], (error, data) => {
			if (error) return res.status(500).send({ status: 'error', message: 'Error en la petición', error });

			return err ? res.status(404).send(err) : res.status(200).send({ data, savedStage });
		});
	});
};

module.exports = {
	insertMatches
};