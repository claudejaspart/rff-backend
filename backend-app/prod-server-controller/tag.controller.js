const Tag = require("../prod-server-models/tag.model");

// recuperation des tags d'un article
const Tags = require("../prod-server-models/tag.model");

// controlleur - recuperation des articles
exports.findByArticleId = (req, res) => 
{
    Tags.findById(req.params.idArticle, (err, data) => 
    {
        if (err) 
        {
            res.status(404).send('null');
        } 
        else 
        {
            res.send(data);
        } 
    });
};