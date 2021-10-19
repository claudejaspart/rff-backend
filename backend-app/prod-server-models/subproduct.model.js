const sql = require("./db");

// constructeur
const SubProduit = (subProduit)=>
{
    this.idSubProduit = subProduit.idSubProduit,
    this.libelle = subProduit.libelle,
    this.description = subProduit.description,
    this.language = subProduit.language
}

module.exports = SubProduit;