revisar el package.json el cual tiene las instrucciones para arrancar el proyecto

    "run:dev": "nodemon index.js"
correr servidor node que autorecargue con cada cambio
    "run:db": "mongod --dbpath=../db-curso-mean-social"
correr base de datos mongo

consola2
cd api && npm run run:db
consola1
cd api && npm start