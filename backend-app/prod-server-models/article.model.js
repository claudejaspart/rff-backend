const sql = require("./db");
const Tag = require("./tag.model");
const SubArticle = require("./subarticle.model")
const Produit = require("./produit.model")

// constructeur
let Article = (article)=>
{
    this.idArticle = article.idArticle,
    this.datepublication = article.datepublication,
    this.level = article.level,
    this.tags = article.tags,
    this.subArticles = article.subArticles,
    this.produits = article.produits
}


// recupere la liste complete de tous les articles avec tous leurs détails
Article.getAll = (result) => 
{   
    // noyau des articles
    getAllArticlesPromise()
    .then(articles=>
    {
        // les tags
        Tag.getTagsPromise(getListArticleIds(articles))
        .then(tags =>
        {
            articles = insertData(articles, tags, 'tags')
            


            /* +++++++++++++++++++++++++++++++++++++++++++++++++++++ */
            // les subarticles
            SubArticle.getSubArticlesPromise(getListArticleIds(articles))
            .then(subArticles =>
            {
                articles = insertData(articles, subArticles, 'subArticles')



                /* *************************************************** */
                // les produits
                Produit.getProduitsAndSubsPromise(getListArticleIds(articles))
                .then(produits =>
                {
                    articles = insertData(articles, produits, 'produits')
                    result(null, articles);
                })
                .catch(err=>result(null, articles))
                /* *************************************************** */



            })
            .catch(err=>result(null, articles))
            /* +++++++++++++++++++++++++++++++++++++++++++++++++++++ */



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

// requete : tous les articles de la table articles 
function getAllArticlesPromise()
{
    return new Promise((resolve, reject)=> sql.query("select * from articles order by idArticle", (err, articles) => err ? reject(err) : resolve(articles)))
}

// insertion des différents champs dans les articles
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