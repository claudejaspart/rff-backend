const sql = require("./db");

// constructeur
const Article = (article)=>
{
    this.idArticle = article.idArticle,
    this.datepublication = article.datepublication,
    this.level = article.level,
    this.products = article.products,
    this.subArticle = article.subArticle,
    this.tags = article.tags
}

// liste des requetes

// getAll
Article.getAll = (result) => 
{
    sql.query("SELECT * FROM articles", (err, resultats) => 
    {
        if (err) 
        {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Articles: ", resultats);
        result(null, resultats);
    });
};



// exportation
module.exports = Article;