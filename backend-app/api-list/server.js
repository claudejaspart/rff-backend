let mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ywsd7x84',
	database: 'rff'
});

connection.connect(err => {
	if(err) {
		return console.error('error: ' + err.message);
}

console.log('Successfully connected to MySQL server.');

});

/* connection.end(err => {
	if(err) {
		return console.error('error: ' + err.message);
}

console.log('Close the database connection.');
}); */


// export
module.exports = connection;   