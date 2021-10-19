let mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'rff'
});

connection.connect(err => 
{
    if(err)
        return console.error('error: ' + err.message);

    console.log('Connected to MySQL server.');
});

// export
module.exports = connection;   


// connection.end(err => 
// {
// 	if(err) 
// 		return console.error('error: ' + err.message);
        
//     console.log('Closed the database connection.');
// });




