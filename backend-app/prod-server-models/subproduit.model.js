const sql = require("./db");

// constructeur
const SubProduit = (subProduit)=>
{
    this.idSubProduit = subProduit.idSubProduit,
    this.libelle = subProduit.libelle,
    this.description = subProduit.description,
    this.language = subProduit.language
}


// requete : tous les produits 
SubProduit.getSubProduitsPromise = (idProduits) =>
{
    let queryString =   "select hsp.idProduit, sp.idSubProduit, sp.libelle, sp.description, sp.language \
                        from subproduits sp                                                             \
                        inner join hassubproduits hsp on hsp.idSubProduit = sp.idSubProduit             \
                        where idProduit in (?);"

    return new Promise((resolve, reject)=> sql.query(queryString, [idProduits], (err, subProduits) => err ? reject(err) : resolve(subProduits)))
}


module.exports = SubProduit;