'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_que_solo_conoce_el_dev';

exports.ensureAuth = (req, res, next) => {
	if(!req.headers.authorization) return res.status(500).send({status: 'error', message: 'la petición no tiene la cabecera de autenticación'});

	var token = req.headers.authorization.replace(/['"]+/g, '');
	
	var payload = null;
	try {
		
		payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()) {
			return res.status(401).send({ status: 'error', message: 'El token ha expirado'});
		}
	} catch (error) {
		return res.status(404).send({ status: 'error', message: 'El token no es válido' });
		//return res.status(500).send({ status: 'error', message: 'error inesperado' });
	}
	req.user = payload;
	next();
}