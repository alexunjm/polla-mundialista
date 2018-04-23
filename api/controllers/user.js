'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
const path = require('path');
const fs = require('fs');

var User = require('../models/user');
var jwt = require('../services/jwt');

/** Método de prueba */
var isAlive = (req, res) => {
	return res.status(200).send({
		status: 'ok',
		message: 'online'
	});
};

var hasDefaultParams = params => {
	return 	params.name &&
			params.email &&
			params.pass;
};

/** Registro */
var saveUser = (req, res) => {
	var params = req.body;
	var user = new User();

	if (hasDefaultParams(params)) {

		user.name = params.name;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		User.find({ $or: [
			{ email: user.email.toLowerCase()},
			{ name: user.name.toLowerCase()}
		]}).exec((err, users) => {
			if (err) return res.status(500).send({ status: 'error', message: 'Error al guardar el usuario' })

			if(users && users.length) {
				return res.status(500).send({ status: 'error', message: 'Error al guardar el usuario: El usuario ya existe' })
			} else {

				bcrypt.hash(params.pass, null, null, (err, hash) => {
					user.pass = hash;
					user.save((err, userStored) => {
						if (err) return res.status(500).send({ status: 'error', message: 'Error al guardar el usuario'})
		
						if(userStored) {
							return res.status(200).send({ status: 'ok', user: userStored});
						} else {
							return res.status(404).send({status: 'error', message: 'no se pudo registrar el usuario'});
						}
					});
				});
			}
		})

	} else {

		return res.status(200).send({
			status: 'error',
			message: 'Debes enviar todos los campos necesarios'
		});
	}

};

/** Login */
var loginUser = (req, res) => {

	var params = req.body;
	var [email, pass] = [params.email, params.pass];

	User.findOne({email: email}, (err, user) => {
		if (err) return res.status(500).send({ status: 'error', message: 'El usuario no se pudo identificar' });

		if(user) {
			bcrypt.compare(pass, user.pass, (err, check) => {
				if(check) {
					
					if(params.getToken) {
						/** Generar token */
						const token = jwt.createToken(user);
						/** Devolver token */
						user.pass = undefined;
						return res.status(200).send({ token, user });
					} else {
						/** Devolvemos datos de usuario */
						user.pass = undefined;
						return res.status(200).send({user});
					}

				} else {
					return res.status(500).send({ status: 'error', message: 'El usuario no se pudo identificar'});
				}
			});
		} else {
			return res.status(500).send({ status: 'error', message: 'El usuario no se pudo identificar' });
		}
	});

}

/** Obtener datos de un usuario */
var getUser = (req, res) => {
	var userId = req.params.id;
	console.log(userId);

	User.findById(userId, (err, user) => {
		if(err) return res.status(500).send({status: 'error', message: 'Error en la petición'});

		if(!user) return res.status(404).send({status: 'error', message: 'El usuario no existe'});

		user.pass = undefined;
		return res.status(200).send({user});
	});
}

/** Devolver un listado de usuarios paginado */
var getUsers = (req, res) => {
	var identityUserId = req.user.sub;
	var page = 1;
	if(req.params.page) {
		page = req.params.page;
	}
	var itemsPerPage = 5;

	User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!users) return res.status(404).send({ status: 'error', message: 'No hay usuarios disponibles' });

		return res.status(200).send({ users, total, pages: Math.ceil(total/itemsPerPage) });
	});
}

/** Actualizar un usuario */
var updateUser = (req, res) => {
	var userId = req.params.id;
	var update = req.body;
	//borrar la propiedad pass
	delete update.pass;

	if (userId != req.user.sub) {
		return res.status(500).send({status: 'error', message: 'No tienes permisos para actualizar los datos del usuario'});
	}
	
	User.findByIdAndUpdate(userId, update, {new: true /*devuelve el objeto actualizado*/}, (err, userUpdated) => {
		if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

		if (!userUpdated) return res.status(404).send({ status: 'error', message: 'No se ha podido actualizar el usuario' });

		return res.status(200).send({user: userUpdated});
	});
}

/** Subir archivos de imagen/avatar de usuario */
var uploadImage = (req, res) => {
	var userId = req.params.id;

	if (userId != req.user.sub) {
		return removeFile(res, filePath, 'No tienes permisos para actualizar la imagen de este usuario');
	}

	if (req.files && req.files.image) {
		var filePath = req.files.image.path;
		var fileName = path.basename(filePath);
		var fileExt = path.extname(fileName);
		console.log(fileExt);

		if (fileExt == '.png' || fileExt == '.jpg' || fileExt == '.jpeg' || fileExt == '.gif') {
			//Actualizar documento de usuario logueado
			User.findByIdAndUpdate(userId, { image: fileName }, { new: true /*devuelve el objeto actualizado*/ }, (err, userUpdated) => {
				if (err) return res.status(500).send({ status: 'error', message: 'Error en la petición' });

				if (!userUpdated) return res.status(404).send({ status: 'error', message: 'No se ha podido actualizar el usuario' });

				return res.status(200).send({ user: userUpdated });
			});
		} else {
			return removeFile(res, filePath, 'Extensión no válida');
		}
	} else {
		return res.status(200).send({status: 'error', message: 'No se adjuntó una imagen en el request'})
	}
};

var removeFile = (res, filePath, message) => {

	fs.unlink(filePath, err => {
		return res.status(500).send({ status: 'error', message});
	});
};

var getImageFile = (req, res) => {
	var imageFile = req.params.imageFile;
	var pathFile = `./uploads/users/${imageFile}` ;

	console.log(pathFile);
	if(fs.existsSync(pathFile)){
		return res.sendFile(path.resolve(pathFile));
	} else {
		return res.status(404).send({ status: 'error', message: 'No existe la imagen' });
	}
};

module.exports = {
	isAlive,
	saveUser,
	loginUser,
	getUser,
	getUsers,
	updateUser,
	uploadImage,
	getImageFile
};