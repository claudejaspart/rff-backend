const sql = require("./db");

// constructeur
const Produit = (produit)=>
{
    this.idProduit = produit.idProduit,
    this.imageLink = produit.imageLink,
    this.productLink = produit.productLink
}

module.exports = Produit;