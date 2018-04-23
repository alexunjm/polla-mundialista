'use strict'

var mongoosePaginate = require('mongoose-pagination');

var Match = require("../models/match");

/** Obtener datos de un partido */
var getMatch = (req, res) => {
	var matchId = req.params.id;

	Match.findById(matchId, (err, match) => {
		if(err) return res.status(500).send({status: 'error', message: 'Error en la petición'});

		if(!match) return res.status(404).send({status: 'error', message: 'El partido no existe'});

		return res.status(200).send({match});
	});
};

/** Devolver un listado de partidos paginado */
var getMatches = (req, res) => {
	var identityUserId = req.user.sub;
	var page = 1;
	if(req.params.page) {
		page = req.params.page;
	}
	var itemsPerPage = 5;
	if (req.params.itemsPerPage) {
		itemsPerPage = req.params.itemsPerPage;
	}

	Match.find().sort('_id').paginate(page, itemsPerPage, (err, matches, total) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!matches) return res.status(404).send({ status: 'error', message: 'No hay partidos disponibles' });

		return res.status(200).send({ matches, total, pages: Math.ceil(total/itemsPerPage) });
	});
}

module.exports = {
	getMatch,
	getMatches
};