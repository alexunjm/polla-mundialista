'use strict'

var mongoosePaginate = require('mongoose-pagination');
const moment = require("moment");

var Forecast = require("../models/forecast");

var hasEveryData = params => 
		params.match &&
		!isNaN(params.home) &&
		!isNaN(params.away);

/** guardar un marcador */
var saveForecast = (req, res) => {
	var params = req.body;
	var forecast = new Forecast();

	if (hasEveryData(params)) {
		forecast.match = params.match;
		forecast.home = params.home;
		forecast.away = params.away;

		forecast.user = req.user.sub;
    	forecast.last_update = moment().unix();

		if(params.result) {
			const forecastId = params.result;
			Forecast.findByIdAndUpdate(forecastId, update, { new: true /*devuelve el objeto actualizado*/ }, (err, forecastUpdated) => {
				if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

				if (!forecastUpdated) return res.status(404).send({ status: 'error', message: 'No se ha podido actualizar el marcador' });

				return res.status(200).send({ forecast: forecastUpdated });
			});
		} else {

			forecast.save((error, forecastStored) => {
				if(error) return res.status(500).send({status: 'error', message: 'Error al guardar marcador'});
	
				if(!forecastStored) return res.status(404).send({status: 'error', message: 'no se pudo registrar el marcador'});
					
				return res.status(200).send({status: 'ok', forecast: forecastStored});
				
				
			});
		}

	} else {
		
		return res
		.status(200)
		.send({
			status: "error",
			message: "Debes enviar todos los campos necesarios",
			requiredFields: "match, home, away",
			params
		});
	}

};

/** Obtener un resultado guardado */
var getForecast = (req, res) => {
	var forecastId = req.params.id;

	Forecast.findById(forecastId, (err, forecast) => {
		if(err) return res.status(500).send({status: 'error', message: 'Error en la petición'});

		if(!forecast) return res.status(404).send({status: 'error', message: 'El resultado no existe'});

		return res.status(200).send({forecast});
	});
};

/** Devolver un listado de forecastados paginado */
var getForecasts = (req, res) => {
	/* var identityUserId = req.user.sub; */
	var page = 1;
	if(req.params.page) {
		page = req.params.page;
	}
	var itemsPerPage = 5;
	if (req.params.itemsPerPage) {
		itemsPerPage = req.params.itemsPerPage;
	}

	Forecast.find().sort('_id').paginate(page, itemsPerPage, (err, forecasts, total) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!forecasts) return res.status(404).send({ status: 'error', message: 'No hay forecastados disponibles' });

		return res.status(200).send({ forecasts, total, pages: Math.ceil(total/itemsPerPage) });
	});
}

module.exports = {
	saveForecast,
	getForecast,
	getForecasts
};