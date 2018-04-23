'use strict'

var mongoose = require('mongoose');
var app = require('./app');

var port_api = 3800;

var db_port = 27017;
var db = 'polla_mundialista_2018';
var url = `mongodb://localhost:${db_port}/${db}`;

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true}).then(() => {
	console.log(`La conexión a la base de datos '${db}' por el puerto ${db_port} se ha establecido correctamente!!`);
	
	//crear servidor
	app.listen(port_api, () => {
		console.log(`Para probar la API entrar a la url: http://localhost:${port_api}/api/is-alive`);
	});
}).catch(err => console.error(err));