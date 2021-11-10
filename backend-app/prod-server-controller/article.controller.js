const Article = require("../prod-server-models/article.model");

// controlleur - recuperation des articles
exports.findAll = (req, res) => 
{
    Article.getAll((err, data) => 
    {
        if (err)
            res.status(500).send({message: err.message || "Erreur lors de la récupération des articles."});
        else 
        {
            res.send(data);
        }
            
    });
};

// controlleur - recuperation des articles "minifiés"
exports.findAllReduced = (req, res) => 
{
    Article.getAllReduced((err, data) => 
    {
        if (err)
            res.status(500).send({message: err.message || "Erreur lors de la récupération des articles."});
        else 
        {
            res.send(data);
        }
            
    });
};

// controlleur - recuperation d'un article complet
exports.findOne = (req, res) => 
{
    Article.getOne(req.params.idArticle, (err, data) => 
    {
        if (err)
        {
            res.status(500).send({message: err.message || "Erreur lors de la récupération de l'article."});
        }
        else 
        {
            res.send(data);
        }
    });
};