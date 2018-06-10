## Comandos luego de tener instalado mongo
## arrancamos la base de datos
$ cd api/ && npm run db
## En otra terminal iniciamos la consola de mongo
$ mongo
## Validamos que bases de datos hay
show dbs
## Cambiamos a la base de datos polla_mundialista_2018
use polla_mundialista_2018

#######################################################


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
	
]);

## insertar partidos
db.matches.insert([
{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810b"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810a"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8117"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8116"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8115"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8114"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8113"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8112"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8111"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8110"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810d"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810c"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810f"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810e"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8119"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8118"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811f"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8121"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811c"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811b"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8123"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8125"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8129"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8128"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811e"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8121"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8124"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8122"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8123"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8122"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8114"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8113"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8125"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8124"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811f"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811e"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810e"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8111"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8114"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8112"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8128"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8127"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8128"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8126"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8110"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810e"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811a"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811d"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810b"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810d"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8127"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8126"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8118"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8117"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811b"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811d"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8121"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8120"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8112"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8115"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8118"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8116"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8124"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8123"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811d"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811c"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810c"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810b"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810f"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8111"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8126"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8129"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8127"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8129"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810c"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810a"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8120"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811f"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8120"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811e"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811c"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811a"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8116"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8119"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8117"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8119"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d811b"),
    "home_team" : ObjectId("5ade65a411c122f9c65d811a"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8113"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8115"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8122"),
    "home_team" : ObjectId("5ade65a411c122f9c65d8125"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d810a"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810d"),
} ,{
    "date" : "1528589230",
    "stage" : ObjectId("5ae35bd0d47434326c6968a5"),
    "away_team" : ObjectId("5ade65a411c122f9c65d8110"),
    "home_team" : ObjectId("5ade65a411c122f9c65d810f"),
}
]);
