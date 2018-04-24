'use strict'

var mongoosePaginate = require('mongoose-pagination');

var Team = require("../models/team");

/** Obtener datos de un equipo */
var getTeam = (req, res) => {
	var teamId = req.params.id;

	Match.findById(teamId, (err, match) => {
		if(err) return res.status(500).send({status: 'error', message: 'Error en la petición'});

		if(!match) return res.status(404).send({status: 'error', message: 'El equipo no existe'});

		return res.status(200).send({match});
	});
};

/** Devolver un listado de equipos paginado */
var getTeams = (req, res) => {
	console.log(req.params);
	var identityUserId = req.user.sub;
	var page = 1;
	if(req.params.page) {
		page = parseInt(req.params.page);
	}
	var itemsPerPage = 4;
	if (req.params.itemsPerPage) {
		itemsPerPage = parseInt(req.params.itemsPerPage);
	}

	Team.find().sort('_id').paginate(page, itemsPerPage, (err, teams, total) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!teams) return res.status(404).send({ status: 'error', message: 'No hay equipos disponibles' });

		return res.status(200).send({ teams, total, pages: Math.ceil(total/itemsPerPage) });
	});
}

module.exports = {
	getTeam,
	getTeams
};