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

## insertar equipos
db.teams.insert([
	{name: "Rusia"},
	{name: "Arabia Saudí"},
	{name: "Egipto"},
	{name: "Uruguay"},
	
	{name: "Portugal"},
	{name: "España"},
	{name: "Marruecos"},
	{name: "Irán"},
	
	{name: "Francia"},
	{name: "Australia"},
	{name: "Perú"},
	{name: "Dinamarca"},
	
	{name: "Argentina"},
	{name: "Islandia"},
	{name: "Croacia"},
	{name: "Nigeria"},

	{name: "Brasil"},
	{name: "Suiza"},
	{name: "Costa Rica"},
	{name: "Serbia"},
	
	{name: "Alemania"},
	{name: "México"},
	{name: "Suecia"},
	{name: "Korea"},

	{name: "Bélgica"},
	{name: "Panamá"},
	{name: "Túnez"},
	{name: "Inglaterra"},

	{name: "Polonia"},
	{name: "Senegal"},
	{name: "Colombia"},
	{name: "Japón"}
	
])