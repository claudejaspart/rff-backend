const sql = require("./db");
const Tag = require("./tag.model");
const SubArticle = require("./subarticle.model");
const Produit = require("./produit.model");
const HasSubArticles = require('./hasSubArticles.model');
const HasProduits = require('./hasProduits.model');
const HasTags = require('./hasTags.model');


// constructeur
let Article = (article)=>
{
    this.idArticle = article.idArticle,
    this.datePublication = article.datepublication,
    this.level = article.level,
    this.archive = article.archive,
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
        Tag.getTagsByIdPromise(getListArticleIds(articles))
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
                    articles = insertData(articles, produits, 'produits');
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

// recupere la liste de tous les articles avec juste ce qu'il faut pour la liste d'édition
Article.getAllReduced = (result) => 
{   
    // noyau des articles
    getAllArticlesPromise()
    .then(articles=>
    {
        // les tags
        Tag.getTagsByIdPromise(getListArticleIds(articles))
        .then(tags =>
        {
            articles = insertData(articles, tags, 'tags')
            /* +++++++++++++++++++++++++++++++++++++++++++++++++++++ */
            // les subarticles
            SubArticle.getSubArticlesReducedPromise(getListArticleIds(articles))
            .then(subArticles =>
            {
                articles = insertData(articles, subArticles, 'subArticles')
                result(null, articles);
            })
            .catch(err=>result(null, articles))
            /* +++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        })
        .catch(err=>result(null, articles))
    })
    .catch(err=>result(err, null));
};

// recupere la liste complete d'un article
Article.getOne = (articleId, result) => 
{   
    // noyau des articles
    getOneArticlePromise(articleId)
    .then(articles=>
    {
        // les tags
        Tag.getTagsByIdPromise(getListArticleIds(articles))
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
                    articles = insertData(articles, produits, 'produits');

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

// ajout d'un nouvel article
Article.add = (article, result) => 
{   
    
    // liste des ID
    let newArticleId = 0;

    // insertion article
    createNewArticlePromise(article.level)
    .then(newArticle =>
    {
        newArticleId = newArticle.insertId;
        
        // insertion subArticles
        SubArticle.newSubArticlesPromise(article.subArticles)
        .then( newSubArticles =>
        {
            let newSubArticlesId = [newSubArticles[0].insertId, newSubArticles[1].insertId]
            // insertion des subArticles dans la table de relation
            HasSubArticles.linkArticleWithSubArticlesPromise(newArticleId,newSubArticlesId)
            .then(
                linkedSubArticles =>
                {
                    // link entre les produits et l'article
                    HasProduits.linkArticleWithProductsPromise(newArticleId, article.produits)
                    .then( linkedProduits =>
                    {
                        Tag.insertOrUpdateTagsPromise(article.tags)
                        .then(newTags =>
                        {
                            HasTags.linkArticleWithTagsPromise(newArticleId, article.tags, newTags)
                            .then(hasTagsQuery =>
                            {
                                result(null, 222);
                            })
                            .catch(err=>result(err,null))
                        })
                        .catch(err => result(err, null))
                    })
                    .catch(err => result(err,null))
                }
            )
            .catch(err=>result(err,null))

            
        })
        .catch(err=> result(err, null))


        
    })
    .catch(err => result(err, null))


};

// maj d'un article
Article.update = (article, result) => 
{   
    //console.log(article);
};


// retourne la liste des IDs des articles récupérés
function getListArticleIds(articles)
{
    return [...articles].map(article => article.idArticle);
}

// requête : tous les articles de la table articles 
function getAllArticlesPromise()
{
    return new Promise((resolve, reject)=> sql.query("select * from articles order by idArticle", (err, articles) => err ? reject(err) : resolve(articles)))
}

// requete : un article de la table article
function getOneArticlePromise(articleId)
{
    return new Promise((resolve, reject)=> sql.query("select * from articles where idArticle = ?", [articleId], (err, articles) => err ? reject(err) : resolve(articles)))
}

// requête : insertion d'un nouvel article
function createNewArticlePromise(level)
{
    return new Promise((resolve, reject)=> sql.query("INSERT INTO articles(datePublication, level) VALUES ( now(), ?)", [level], (err, articles) => err ? reject(err) : resolve(articles)))
}

// insertion des différents champs dans les articles
function insertData(articles, data, dataLabel)
{
    [...articles].forEach(article => 
    {
        // insert le tableau de data dans articles
        article[dataLabel] = data.filter(dataEl => dataEl.idArticle === article.idArticle);

        // supprime les champs idArticles
        for (i in article[dataLabel]) delete article[dataLabel][i].idArticle
    });

    return articles;
}

// exportation
module.exports = Article;