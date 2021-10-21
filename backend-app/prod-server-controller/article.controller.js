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