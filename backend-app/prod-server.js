const express = require('express');
const cors = require('cors');
const app = express();
const port = 4201;
const bodyParser = require("body-parser");

// utilisation des middleware
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// liens vers les routes
require("./prod-server-routes/article.routes")(app);
require("./prod-server-routes/produit.routes")(app);
require("./prod-server-routes/tag.route")(app);

// lancement du serveur
app.listen(port,  () =>
{
    console.log(`Le serveur backend RFF lancé sur le port ${port}!`);
});