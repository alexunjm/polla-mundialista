'use strict'

var mongoosePaginate = require('mongoose-pagination');

var Result = require("../models/result");

/** Método de prueba */
var test = (req, res) => {
	return res.status(200).send({
		status: 'ok',
		message: 'online'
	});
};

/** guardar un marcador */
var saveResult = (req, res) => {
	var params = req.body;
	var result = new Result();

	if (params.match && params.home && params.away) {

		result.match = params.match;
		result.home = params.home;
		result.away = params.away;
		result.user = req.user.sub;
		result.last_update = moment().unix();

		result.save((error, resultStored) => {
			if(error) return res.status(500).send({status: 'error', message: 'Error al guardar marcador'});

			if(resultStored) {
				return res.status(200).send({status: 'ok', result: resultStored});
			}
			return res.status(404).send({status: 'error', message: 'no se pudo registrar el marcador'});
			
		});

	} else {

		return res.status(200).send({
			status: 'error',
			message: 'Debes enviar todos los campos necesarios'
		});
	}

};

/** Actualizar un resultado */
var updateResult = (req, res) => {
	var resultId = req.params.id;
	var update = req.body;
		update.last_update = moment().unix();

	if (update.user != req.user.sub) {
		return res.status(500).send({status: 'error', message: 'No tienes permisos para actualizar los datos del usuario'});
	}
	
	Result.findByIdAndUpdate(resultId, update, {new: true /*devuelve el objeto actualizado*/}, (err, resultUpdated) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!resultUpdated) return res.status(404).send({ status: 'error', message: 'No se ha podido actualizar el resultado' });

		return res.status(200).send({result: resultUpdated});
	});
}

/** Obtener datos de un resultado */
var getResult = (req, res) => {
	var resultId = req.params.id;

	Result.findById(resultId, (err, result) => {
		if(err) return res.status(500).send({status: 'error', message: 'Error en la petición'});

		if(!result) return res.status(404).send({status: 'error', message: 'El resultado no existe'});

		return res.status(200).send({result});
	});
};

/** Devolver un listado de resultados paginado */
var getResults = (req, res) => {
	var identityUserId = req.user.sub;
	var page = 1;
	if(req.params.page) {
		page = req.params.page;
	}
	var itemsPerPage = 5;
	if (req.params.itemsPerPage) {
		itemsPerPage = req.params.itemsPerPage;
	}

	Result.find().sort('_id').paginate(page, itemsPerPage, (err, results, total) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!results) return res.status(404).send({ status: 'error', message: 'No hay resultados disponibles' });

		return res.status(200).send({ results, total, pages: Math.ceil(total/itemsPerPage) });
	});
}

module.exports = {
	test,
	saveResult,
	updateResult,
	getResult,
	getResults
};