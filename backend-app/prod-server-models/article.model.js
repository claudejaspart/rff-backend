const sql = require("./db");
const Tag = require("./tag.model");
const Tags = require("./tag.model");

// constructeur
let Article = (article)=>
{
    this.idArticle = article.idArticle,
    this.datepublication = article.datepublication,
    this.level = article.level,
    this.tags = article.tags
}


// recupere tous les articles et leurs descriptions en francais
Article.getAll = (result) => 
{   
    getAllArticlesPromise()
    .then(articles=>
    {
        Tag.getTagsPromise(getListArticleIds(articles))
        .then(tags=>
        {
            result(null, insertData(articles, tags, 'tags'));
        })
        .catch(err=>result(null, articles))
    })
    .catch(err=>result(err, null));
};

// retourne la liste des IDs des articles récupérés
function getListArticleIds(articles)
{
    return [...articles].map(article => article.idArticle);
}

// encapsulation une promise
function getAllArticlesPromise()
{
    return new Promise((resolve, reject)=> sql.query("select * from articles order by idArticle", (err, articles) => err ? reject(err) : resolve(articles)))
}

// insertion des tags dans les articles
function insertData(articles,data, dataLabel)
{
    [...articles].forEach(article => 
    {
        article[dataLabel] = data.filter(el => el.idArticle === article.idArticle);
    });

    return articles;
}

// exportation
module.exports = Article;