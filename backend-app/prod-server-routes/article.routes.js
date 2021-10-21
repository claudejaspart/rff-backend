module.exports = (app) => 
{
    const articles = require("../prod-server-controller/article.controller");

    // route : récupération de tous les articles
    app.get("/articles", articles.findAll);

};