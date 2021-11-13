const sql = require("./db");

// constructeur
const hasProduits = (hasproduits) =>
{
    this.id = hasproduits.id,
    this.idArticle = hasproduits.idArticle,
    this.idSubProduit = hasproduits.idProduit
}


// ajoute une relation entre le produit et les sous-produits
hasProduits.linkArticleWithProductsPromise = (idArticle, idProduits) =>
{
    let data = [];
    let atomicQueryString =  "INSERT INTO hasProduits (idArticle,idProduit) VALUES (?,?);";
    let queryString = "";
    [...idProduits].forEach(idProduit => 
    {
        data.push(idArticle);
        data.push(idProduit.idProduit);
        queryString += atomicQueryString;
    });
    
    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, queryhasprod) => err ? reject(err) : resolve(queryhasprod)))
};


module.exports = hasProduits;