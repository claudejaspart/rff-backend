module.exports = (app) => 
{
    const produits = require("../prod-server-controller/produit.controller");

    // route : récupération de tous les produits
    app.get("/produits", produits.getAll);

    // route : ajout d'un produit
    app.post("/produit", produits.add);

    // route : maj d'un produit
    app.put("/produit", produits.update);

};