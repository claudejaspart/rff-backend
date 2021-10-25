const sql = require("./db");

// constructeur
const SubArticle = (subArticle) =>
{
    this.idSubArticle = subArticle.idSubArticle,
    this.titre = subArticle.titre,
    this.description = subArticle.description,
    this.richTextData = subArticle.richTextData,
    this.videoLink = subArticle.videoLink,
    this.language = subArticle.language 
}

// requete : tous les sous-articles de la table sous-article
SubArticle.getSubArticlesPromise = (idArticles) =>
{
    let queryString =   "select hsa.idArticle, sa.idSubarticle, sa.titre, sa.description, sa.richTextData, sa.videolink, sa.language from subarticles sa \
                        inner join hassubarticles hsa on hsa.idSubArticle = sa.idSubArticle \
                        where hsa.idArticle in (?);"

    return new Promise((resolve, reject)=> sql.query(queryString, [idArticles], (err, subArticles) => err ? reject(err) : resolve(subArticles)))
}

// requete : tous les sous-articles de la table sous-article avec que le titre, la description, et la langue
SubArticle.getSubArticlesReducedPromise = (idArticles) =>
{
    let queryString =   "select hsa.idArticle, sa.idSubarticle, sa.titre, sa.description, sa.language from subarticles sa \
                        inner join hassubarticles hsa on hsa.idSubArticle = sa.idSubArticle \
                        where hsa.idArticle in (?);"

    return new Promise((resolve, reject)=> sql.query(queryString, [idArticles], (err, subArticles) => err ? reject(err) : resolve(subArticles)))
}

module.exports = SubArticle;