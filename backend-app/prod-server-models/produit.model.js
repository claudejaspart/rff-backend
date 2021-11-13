const sql = require("./db");
const SubProduit = require('./subproduit.model');
const hasSubProduits = require('./hasSubProduits.model');

// constructeur
const Produit = (produit)=>
{
    this.idProduit = produit.idProduit,
    this.imageLink = produit.imageLink,
    this.produitLink = produit.produitLink,
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

// récupere un produit et ses sous-produits
Produit.getOne = (productId, result) => 
{   
    // récupération de l'article
    getOneProductPromise(productId)
    .then(selectedProduct =>
        {
            // récupération des sous-produits
            SubProduit.getSubProduitsPromise(getListProduitIds(selectedProduct))
            .then(subProduits =>
            {
                selectedProduct = insertData(selectedProduct, subProduits, 'subProduits');
                result(null, selectedProduct);
            })
            .catch(err=>result(err, null));
        })
    .catch(err=>result(err, null))
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

// MAJ d'un produit
Produit.updateProduit = (majProduit, result) =>
{
    Produit.updateProduitsPromise(majProduit)
    .then(queryres =>
    {
        SubProduit.updateSubProduitsPromise(majProduit.subProduits)
        .then(querysubprod => result(null, majProduit.idProduit))
        .catch(err => result(err, null))
    })
    .catch(err => result(err, null));
}

// Creation d'un produit
Produit.addProduit = (addProduit, result) =>
{
    Produit.addProduitsPromise(addProduit)
    .then(queryres =>
    {
        // id du produit créé
        let newProduitId = queryres.insertId;

        // insere les sous-produits
        SubProduit.addSubProduitsPromise(addProduit.subProduits)
        .then(querysubprod => 
        {
            // ajoute la relation entre le produit et les sous-produits
            let newSubProduitsIds = [querysubprod[0].insertId,querysubprod[1].insertId];
            hasSubProduits.linkProductWithSubProductsPromise(newProduitId, newSubProduitsIds)
            .then(queryLink => result(null, newProduitId))
            .catch(err => result(err, null))
        })
        .catch(err => result(err, null))
    })
    .catch(err => result(err, null));
}


// requete : tous les produits d'une liste d'ids d'article
Produit.getProduitsPromise = (idArticles) =>
{
    let queryString =   "select hpr.idArticle, prod.idProduit, prod.imageLink, prod.produitLink from produits prod \
                        inner join hasProduits hpr on hpr.idProduit = prod.idProduit \
                        where hpr.idArticle in (?);"

    return new Promise((resolve, reject)=> sql.query(queryString, [idArticles], (err, produits) => err ? reject(err) : resolve(produits)))
}

// requete : un seul produit 
getOneProductPromise = (productId) =>
{
    let queryString =   "select idProduit, imageLink, produitLink from produits where idProduit = ?;";
    return new Promise((resolve, reject)=> sql.query(queryString, [productId], (err, selectedProduct) => err ? reject(err) : resolve(selectedProduct)))
}

// requete : tous les produits 
getAllProduitsPromise = () =>
{
    let queryString =   "select prod.idProduit, prod.imageLink, prod.produitLink from produits prod;";
    return new Promise((resolve, reject)=> sql.query(queryString, (err, produits) => err ? reject(err) : resolve(produits)))
}

// requete : tmaj d'un produit
Produit.updateProduitsPromise = (majProduit) =>
{
    // recuperation des données
    let produitId = majProduit.idProduit;
    let imageUrl = majProduit.imageLink;
    let produitUrl = majProduit.produitLink;

    // requete de maj
    let queryString = "UPDATE Produits SET imageLink = ?, produitLink = ? WHERE (`idProduit` = ?);";

    // execution de la requete
    return new Promise((resolve, reject)=> sql.query(queryString,[imageUrl, produitUrl, produitId] , (err, queryres) => err ? reject(err) : resolve(queryres)))
}

// requete : tmaj d'un produit
Produit.addProduitsPromise = (newProduit) =>
{
    // requete de maj
    let queryString = "INSERT INTO Produits (imageLink, produitLink) VALUES (?,?);";

    // execution de la requete
    return new Promise((resolve, reject)=> sql.query(queryString,[newProduit.imageLink,newProduit.produitLink] , (err, queryres) => err ? reject(err) : resolve(queryres)))
}


// retourne la liste des IDs des produits récupérés
function getListProduitIds(produits)
{
    return [...produits].map(produit => produit.idProduit);
}


// insertion des différents champs dans les produits
function insertData(produits,data,dataLabel)
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