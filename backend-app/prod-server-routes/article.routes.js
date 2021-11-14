const multer = require('multer');
const path = require('path');

// configuration de multer
const storage = multer.diskStorage(
{
    destination: function(req, file, cb) 
    {
        cb(null, path.join(__dirname, '../archives/'));
    },
    filename: function(req, file, cb) 
    {
        cb(null, file.originalname);
    }
});
const upload = multer({storage:storage});


module.exports = (app) => 
{
    const articles = require("../prod-server-controller/article.controller");

    // route : récupération de tous les articles
    app.get("/articles", articles.findAll);

    // route : récupération de tous les articles
    app.get("/miniarticles", articles.findAllReduced);

    // route : récupération d'un article
    app.get("/article/:idArticle", articles.findOne);

    // route : ajout d'un nouvel article
    app.post("/article", upload.any('zip'), articles.addNew);

    // route : maj d'un article
    app.put("/article", upload.any('zip'), articles.maj);
};