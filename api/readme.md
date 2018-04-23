## consola1
### iniciar la base de datos (debe estar instalado mongodb previamente)
cd api/ && npm run db
    "db": "mongod --dbpath=../db-mongo"

## consola2
### iniciar entorno de desarrollo de la API 
cd api/ && npm run dev
    "dev": "nodemon index.js"


revisar el package.json el cual tiene las instrucciones para arrancar el proyecto