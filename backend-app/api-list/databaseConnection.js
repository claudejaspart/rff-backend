let mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ywsd7x84',
	database: 'rff'
});

// export
module.exports = connection;   