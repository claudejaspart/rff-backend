const sql = require("./db");
const SubProduit = require('./subproduit.model')

// constructeur
const Produit = (produit)=>
{
    this.idProduit = produit.idProduit,
    this.imageLink = produit.imageLink,
    this.productLink = produit.productLink,
    this.subProduit = produit.subProduit
}



// recupere la liste complete de tous les articles avec tous leurs détails
Produit.getCompleteList = (result) => 
{   
    // noyau des articles
    getAllProduitsPromise()
    .then(produits=>
    {
        SubProduit.getSubProduitsPromise(getListProduitIds(produits))
        .then(subProduits =>
        {
            produits = insertData(produits, subProduits, 'subProduits');
            result(null, produits);
        })
        .catch(err=>result(err, null));
    })
    .catch(err=>result(err, null));
};



// retourne tous les produits et leurs sous-produits
Produit.getProduitsAndSubsPromise = (idArticles) =>
{
    return new Promise((resolve, reject) =>
    {
        Produit.getProduitsPromise(idArticles)
        .then(produits =>
        {
            SubProduit.getSubProduitsPromise(getListProduitIds(produits))
            .then(subProduits =>
            {
                produits = insertData(produits, subProduits, 'subProduits');
                resolve(produits);
            })
            .catch(err=>reject(err));
        })
        .catch(err => reject(err));
    });
}

// requete : tous les produits d'une liste d'ids
Produit.getProduitsPromise = (idArticles) =>
{
    let queryString =   "select hpr.idArticle, prod.idProduit, prod.imageLink, prod.produitLink from produits prod \
                        inner join hasProduits hpr on hpr.idProduit = prod.idProduit \
                        where hpr.idArticle in (?);"

    return new Promise((resolve, reject)=> sql.query(queryString, [idArticles], (err, produits) => err ? reject(err) : resolve(produits)))
}

// requete : tous les produits 
getAllProduitsPromise = () =>
{
    let queryString =   "select prod.idProduit, prod.imageLink, prod.produitLink from produits prod";
    return new Promise((resolve, reject)=> sql.query(queryString, (err, produits) => err ? reject(err) : resolve(produits)))
}


// retourne la liste des IDs des produits récupérés
function getListProduitIds(produits)
{
    return [...produits].map(produit => produit.idProduit);
}


// insertion des différents champs dans les produits
function insertData(produits,data, dataLabel)
{
    [...produits].forEach(produit => 
    {
        // rattache les subProduit au produit
        produit[dataLabel] = data.filter(el => el.idProduit === produit.idProduit);

        // supprime les champs idProduit
        for (i in produit[dataLabel]) delete produit[dataLabel][i].idProduit
    });

    return produits;
}

module.exports = Produit;