const connection = require('./databaseConnection');
const express = require('express');
const getArticlesRouter = express.Router();


// récupère la liste des articles
getArticlesRouter.get('/subarticles', (error,response) =>
{
    getArticlesQuery = 'select * from subarticle;';

    connection.connect(err => 
    {
        if(err)
            return console.error('error: ' + err.message);
        else
        {
            console.log('Connected to MySQL server.');
            connection.query(getArticlesQuery, (err,result,fields)=>
            {
                console.log(result);
                connection.end();
                response.send("ok");
            });
        }
    });
});


// export
module.exports = getArticlesRouter;   


// database
//             .(getArticles)
//             .then(data => 
//             {
//                 console.log(data)
//                 response.send(data);
//             })
//             .catch(error => {response.send(error)})