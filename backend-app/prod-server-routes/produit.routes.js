module.exports = (app) => 
{
    const produits = require("../prod-server-controller/produit.controller");

    // route : récupération de tous les produits
    app.get("/produits", produits.getAll);

};