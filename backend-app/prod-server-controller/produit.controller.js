const Produit = require("../prod-server-models/produit.model");

// controlleur - recuperation des articles
exports.getAll = (req, res) => 
{
    Produit.getCompleteList((err, data) => 
    {
        if (err)
            res.status(500).send({message: err.message || "Erreur lors de la récupération des produits."});
        else 
        {
            res.send(data);
        }
            
    });
};



