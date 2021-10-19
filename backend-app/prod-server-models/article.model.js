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

// recupere tous les articles et leurs descriptions en francais
Article.getAll = (result) => 
{
    /*
        select * from hassubarticles hsa 
        inner join articles a on a.idArticle = hsa.idArticle 
        inner join subarticle sa on sa.idSubArticle = hsa.idSubArticle 
        where sa.language = "fr";
    */
   
    sql.query(`select * from hassubarticles hsa inner join articles a on a.idArticle = hsa.idArticle inner join subarticle sa on sa.idSubArticle = hsa.idSubArticle where sa.language = 'fr';`, (err, resultats) => 
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