const Produit = require("../prod-server-models/produit.model");

// controlleur - recuperation des produits
exports.getAll = (req, res) => 
{
    Produit.getCompleteList((err, data) => 
    {
        if (err)
        {
            res.status(500).send({message: err.message || "Erreur lors de la récupération des produits."});
        }
        else 
        {
            res.send(data);
        }
    });
};

// controlleur - recuperation d'un article complet
exports.findOne = (req, res) => 
{
    Produit.getOne(req.params.productId, (err, data) => 
    {
        if (err)
        {
            res.status(500).send({message: err.message || "Erreur lors de la récupération du produit."});
        }
        else 
        {
            res.send(data);
        }
    });
};

// controlleur - ajout d'un produit
exports.add = (req, res) => 
{
    Produit.addProduit(req.body, (err, productId) => 
    {
        if (err)
        {
            res.status(500).send({message:err.message || "Erreur lors de la mise à jour du produit."});
        }
        else 
        {
            res.send({productId});
        }
    });
};

// controlleur - maj d'un produit
exports.update = (req, res) => 
{
    Produit.updateProduit(req.body, (err, productId) => 
    {
        if (err)
        {
            res.status(500).send({message: err.message || "Erreur lors de la mise à jour du produit."});
        }
        else 
        {
            res.send(productId.toString());
        }
    });
};


