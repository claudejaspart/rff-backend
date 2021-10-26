module.exports = (app) => 
{
    const tags = require("../prod-server-controller/tag.controller");

    // route : récupération de tous les tags d'un article
    app.get("/tags/:idArticle", tags.findByArticleId);

    // route : récupération de tous les articles
    app.get("/alltags", tags.getAll);
};