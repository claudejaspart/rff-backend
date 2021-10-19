var cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 4201;
const path = require('path');

app.use(cors());

// servir le site web angular frontend
/* app.use(express.static(path.join(__dirname, '../backend-app/frontend-app')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname))); */


// liste des API edition d'un article
const getArticles  = require('./api-list/get-articles');
app.use(getArticles);

// lancement du serveur
app.listen(port, function () {console.log('RFF server listening on port 4201!')});