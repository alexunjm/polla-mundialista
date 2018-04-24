'use strict'

const mongoosePaginate = require('mongoose-pagination');

const Match = require("../models/match");
const Team = require("../models/team");
const Temporal = require("../models/temporal");
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

		return res.status(200).send({ matches, total, pages: Math.ceil(total/itemsPerPage) });
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

const insertMatches = (req, res) => {
	var year = 2018;
	if(req.params.year) {
		year = req.params.year;
	}
	var stage = "group stage";
	if (req.params.stage) {
		stage = req.params.stage;
	}
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
					}, (err, matchRes) => err ? cbMap(err) : cbMap(null, {detail: matchRes, match})
				), (error, result) => error ? cb(error) : cb(null, result));
		},
	], (error, data) => {
		if(error) return res.status(500).send({ status: 'error', message: 'Error en la petición', error });

		return res.status(200).send({ data });
	});
};

module.exports = {
	getMatch,
	getMatches,
	insertMatches
};