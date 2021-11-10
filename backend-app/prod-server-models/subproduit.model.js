const sql = require("./db");

// constructeur
const SubProduit = (subProduit)=>
{
    this.idSubProduit = subProduit.idSubProduit,
    this.libelle = subProduit.libelle,
    this.description = subProduit.description,
    this.language = subProduit.language
}


// requete : tous les subproduits d'un produit
SubProduit.getSubProduitsPromise = (idProduits) =>
{
    let queryString =   "select hsp.idProduit, sp.idSubProduit, sp.libelle, sp.description, sp.language \
                        from subproduits sp                                                             \
                        inner join hassubproduits hsp on hsp.idSubProduit = sp.idSubProduit             \
                        where idProduit in (?) order by language asc;;"

    return new Promise((resolve, reject)=> sql.query(queryString, [idProduits], (err, subProduits) => err ? reject(err) : resolve(subProduits)))
}

// requete : maj d'un subproduit d'un produit
SubProduit.updateSubProduitsPromise = (majSubProduits) =>
{
   let data = [];
   let atomicQueryString =  "UPDATE subProduits SET libelle = ?, description = ? WHERE idSubProduit = ?;";
   let queryString = "";
    majSubProduits.forEach(majSubProd => 
    {
        data.push(majSubProd.libelle);
        data.push(majSubProd.description);
        data.push(majSubProd.idSubProduit);
        queryString += atomicQueryString;
    });

    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, querysubprod) => err ? reject(err) : resolve(querysubprod)))
}

// requete : ajout d'un subproduit d'un produit
SubProduit.addSubProduitsPromise = (addSubProduits) =>
{
   let data = [];
   let atomicQueryString =  "INSERT INTO subProduits (libelle, description, language) VALUES (?,?,?);";
   let queryString = "";
    addSubProduits.forEach(addSubProd => 
    {
        data.push(addSubProd.libelle);
        data.push(addSubProd.description);
        data.push(addSubProd.language);
        queryString += atomicQueryString;
    });

    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, querysubprod) => err ? reject(err) : resolve(querysubprod)))
}

module.exports = SubProduit;
