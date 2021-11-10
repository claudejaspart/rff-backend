const sql = require("./db");

// constructeur
const hasSubProduits = (hassubproduits) =>
{
    this.id = hassubproduits.id,
    this.idProduit = hassubproduits.idProduit,
    this.idSubProduit = hassubproduits.idSubProduit
}



// ajoute une relation entre le produit et les sous-produits
hasSubProduits.linkProductWithSubProductsPromise = (idProduit, idSubProduits) =>
{
    let data = [];
    let atomicQueryString =  "INSERT INTO hasSubProduits (idProduit,idSubProduit) VALUES (?,?);";
    let queryString = "";
    [...idSubProduits].forEach(subProduitId => 
     {
         data.push(idProduit);
         data.push(subProduitId);
         queryString += atomicQueryString;
     });

     return new Promise((resolve, reject)=> sql.query(queryString, data, (err, queryhassubprod) => err ? reject(err) : resolve(queryhassubprod)))
};


module.exports = hasSubProduits;