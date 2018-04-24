## ver todos los usuarios
db.users.find()
## insertar un usuario (con contraseña test)
db.users.insert({ 
	"pass": "$2a$10$Pg09a5Zul7U0kYkyqb3Vku4TB0Sk3aY94sdqul7OgmAKOGEhMOiQK",
	"image": null,
	"role": "ROLE_USER",
	"email": "alex@test.io",
	"name": "alex"
 })