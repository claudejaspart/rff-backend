module.exports = (app) => 
{
    const tags = require("../prod-server-controller/tag.controller");

    // route : récupération de tous les articles
    app.get("/tags/:idArticle", tags.findByArticleId);

};