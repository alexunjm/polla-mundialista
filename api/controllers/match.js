'use strict'

const mongoosePaginate = require('mongoose-pagination');
const moment = require("moment");

const Match = require("../models/match");
const Team = require("../models/team");
const Forecast = require("../models/forecast");
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

const findStage = (stageId, _cb) => Stage.findById(stageId, _cb);

const findData = (matches, cbFD) => {
	async.map(matches, 
		(match, cb) => {
			
			async.parallel({
				stage: (_cb) => findStage(match.stage, _cb),
				home_team: (_cb) => {
					Team.findById(match.home_team, (err, team) => err ? _cb(err) : _cb(null, team));
				},
				away_team: (_cb) => {
					Team.findById(match.away_team, (err, team) => (err ? _cb(err) : _cb(null, team)));
				},
				results: (_cb) => {
					
					Forecast.find({ match: match._id }).exec(
						(err, forecasts) => (err ? _cb(err) : _cb(null, forecasts))
					);
				}
			}, (error, data) => {
				if (error) cb(error);

				data._id = match.id;
				cb(null, data);
			});

		},
		(error, data) => {
			if (error) cbFD(error);

			cbFD(null, data);
		}
	);
}

const findMatches = (page, itemsPerPage, conditions, res) => 
	Match.find(conditions).sort('_id').paginate(page, itemsPerPage, (err, matches, total) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición', err });

		if (!matches) return res.status(404).send({ status: 'error', message: 'No hay partidos disponibles' });
		
		findData(matches, (error, result) => {
			if (error) return res.status(500).send({ status: 'error', message: error });

			return res.status(200).send({ matches: result, total, pages: Math.ceil(total/itemsPerPage) });
		});
	});

/** Devolver un listado de partidos paginado */
const getMatches = (req, res) => {
	const identityUserId = req.user.sub;
	let page = 1;
	if(req.params.page) {
		page = Number.parseInt(req.params.page);
	}
	let itemsPerPage = 5;
	if (req.params.itemsPerPage) {
		itemsPerPage = Number.parseInt(req.params.itemsPerPage);
	}
	if (req.params.stage) {
		findStage(req.params.stage, (err, stage) =>
			err ?
			res.status(500).send({ status: 'error', message: err }) :
				(
					stage ?
					findMatches(page, itemsPerPage, {stage: stage._id}, res):
					res.status(404).send({ status: 'error', message: 'No se encontró el stage' })
				)
    	);
	} else {
		return findMatches(page, itemsPerPage, {}, res);
	}
}
module.exports = {
	getMatch,
	getMatches
};