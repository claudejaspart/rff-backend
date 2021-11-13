const sql = require("./db");

// constructeur
const hasSubArticles = (hassubarticles) =>
{
    this.id = hassubarticles.id,
    this.idArticle = hassubarticles.idArticle,
    this.idSubArticle = hassubarticles.idSubArticle
}



// ajoute une relation entre le Article et les sous-Articles
hasSubArticles.linkArticleWithSubArticlesPromise = (idArticle, idSubArticles) =>
{
    let data = [];
    let atomicQueryString =  "INSERT INTO hasSubArticles (idArticle,idSubArticle) VALUES (?,?);";
    let queryString = "";
    [...idSubArticles].forEach(subArticleId => 
    {
        data.push(idArticle);
        data.push(subArticleId);
        queryString += atomicQueryString;
    });

    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, queryhassubart) => err ? reject(err) : resolve(queryhassubart)))
};


module.exports = hasSubArticles;