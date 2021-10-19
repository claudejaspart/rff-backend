const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors');
app.use(cors());

// liste des API edition d'un article
const getArticles  = require('./api-list/get-articles');

app.use(getArticles);

// renvoi le site web
// app.use(express.static(path.join(__dirname, './front-end/rff-blog')));
// app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

// lancement du serveur
app.listen(4201, function () 
{
    console.log('RFF server listening on port 4201!')
});