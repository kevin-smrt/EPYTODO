// Récupère les variables du fichier .env
require("dotenv").config();
// Import du client
const mysql = require('mysql2');

// Crée la connection
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

module.exports = connection;