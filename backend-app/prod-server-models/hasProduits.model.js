const sql = require("./db");

// constructeur
const hasProduits = (hasproduits) =>
{
    this.id = hasproduits.id,
    this.idArticle = hasproduits.idArticle,
    this.idSubProduit = hasproduits.idProduit
}


// ajoute une relation entre l'article et les produits
hasProduits.linkArticleWithProductsPromise = (idArticle, produits) =>
{
    let data = [];
    let atomicQueryString =  "INSERT INTO hasProduits (idArticle,idProduit) VALUES (?,?);";
    let queryString = "";
    [...produits].forEach(produit => 
    {
        data.push(idArticle);
        data.push(produit.idProduit);
        queryString += atomicQueryString;
    });
    
    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, queryhasprod) => err ? reject(err) : resolve(queryhasprod)))
};

// supprime toutes les relations produit d'un article
hasProduits.unlinkArticleProductsPromise = (idArticle) =>
{
    return new Promise((resolve, reject)=> sql.query("delete from hasProduits where idArticle = ?;", [idArticle], (err, deleteprod) => err ? reject(err) : resolve(deleteprod)))
};

module.exports = hasProduits;