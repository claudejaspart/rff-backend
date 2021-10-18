const express = require('express');
const app = express();
const path = require('path');


// servir le site web angular frontend
app.use(express.static(path.join(__dirname, '/frontend-app')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

// lancement du serveur
app.listen(4201, function () {console.log('RFF blog listening on port 4201!')});
















/* const express = require('express');
const app = express();

// liste des API edition d'un article
const getArticles  = require('./api-list/get-articles');
app.use(getArticles);

// lancement du serveur
app.listen(4201, function () {console.log('RFF server listening on port 4201!')}); */