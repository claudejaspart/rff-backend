const connection = require('./server');
const express = require('express');
const getSubArticlesRouter = express.Router();


// récupère la liste des articles

getSubArticlesRouter.get('/subarticles', (request,response) =>
{
    // récupération langue
    let lang = request.query.lang;
    // console.log(lang);
    let sqlQuery = "";

    if(request.query.lang) {
        sqlQuery = `SELECT * FROM subarticle WHERE language = '${lang}';`;
    }
    else {
        sqlQuery = 'SELECT * FROM subarticle;';
    }
        
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result,fields)=>
    {
        // console.log(result);
        response.send(result);
    });
});

// export
module.exports = getSubArticlesRouter;



// database
//             .(getArticles)
//             .then(data => 
//             {
//                 console.log(data)
//                 response.send(data);
//             })
//             .catch(error => {response.send(error)})