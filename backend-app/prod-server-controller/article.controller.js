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

// controlleur - ajout d'un nouvel article
exports.addNew = (req, res) => 
{
    Article.add(JSON.parse(req.body.article), (err, data) => 
    {
        if (err)
        {
            res.status(500).send({message: err.message || "Erreur lors de l'ajout du nouvel article."});
        }
        else 
        {
            res.status(200).send();
        }
    });
};

// controlleur - mis à jour d'un article
exports.maj = (req, res) => 
{
    Article.update(JSON.parse(req.body.article), (err, data) => 
    {
        if (err)
        {
            res.status(500).send({message: err.message || "Erreur lors de la mise à jour de l'article."});
        }
        else 
        {
            res.status(200).send();
        }
    });
};