const express = require('express');
const app = express();

// liste des API edition d'un article
const getArticles  = require('./api-list/get-articles');
app.use(getArticles);

// lancement du serveur
app.listen(4201, function () {console.log('RFF server listening on port 4201!')});