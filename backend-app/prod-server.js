const express = require('express');
const cors = require('cors');
const app = express();
const port = 4201;

// utilisation des middleware
app.use(cors());

// liens vers les controleurs
require("./prod-server-routes/article-routes")(app);

// lancement du serveur
app.listen(port,  () =>
{
    console.log(`Le serveur backend RFF lancé sur le port ${port}!`);
});