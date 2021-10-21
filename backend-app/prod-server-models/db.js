const mysql = require('mysql');
const dbConfig = require('./db.config');

// Créé une connection à la BDD
const connection = mysql.createConnection(
{
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DATABASE
});

// Ouverture de la connection
connection.connect(err => 
{
    if(err)
        return console.error('Erreur de connexion: ' + err.message);

    console.log('Connexion à la bdd MySql réussie !');
});

// export
module.exports = connection;