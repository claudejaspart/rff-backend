module.exports = (app) => 
{
    const articles = require("../prod-server-controller/article.controller");

    // route : récupération de tous les articles
    app.get("/articles", articles.findAll);

    // route : récupération de tous les articles
    app.get("/miniarticles", articles.findAllReduced);

    // route : récupération d'un article
    app.get("/article/:idArticle", articles.findOne);

};