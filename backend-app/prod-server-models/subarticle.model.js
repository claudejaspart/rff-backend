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

// requête : version complete - tous les sous-articles de la table sous-article
SubArticle.getSubArticlesPromise = (idArticles) =>
{
    let queryString =   "select hsa.idArticle, sa.idSubarticle, sa.titre, sa.description, sa.richTextData, sa.videolink, sa.language from subarticles sa \
                        inner join hassubarticles hsa on hsa.idSubArticle = sa.idSubArticle \
                        where hsa.idArticle in (?) \
                        order by language asc;"

    return new Promise((resolve, reject)=> sql.query(queryString, [idArticles], (err, subArticles) => err ? reject(err) : resolve(subArticles)))
}

// requete : version réduite
SubArticle.getSubArticlesReducedPromise = (idArticles) =>
{
    let queryString =   "select hsa.idArticle, sa.idSubarticle, sa.titre, sa.language from subarticles sa \
                        inner join hassubarticles hsa on hsa.idSubArticle = sa.idSubArticle \
                        where hsa.idArticle in (?) \
                        order by language asc;"

    return new Promise((resolve, reject)=> sql.query(queryString, [idArticles], (err, subArticles) => err ? reject(err) : resolve(subArticles)))
}

// requete : insertion des subArticles
SubArticle.newSubArticlesPromise = (newSubArticles) =>
{
    let data = [];
    let atomicQueryString =  "INSERT INTO subArticles(titre,description,richTextData,videoLink,language) VALUES (?,?,?,?,?);";
    let queryString = "";
    newSubArticles.forEach(newSubArt => 
    {
        data.push(newSubArt.titre);
        data.push(newSubArt.description);
        data.push(newSubArt.richTextData);
        data.push(newSubArt.videoLink);
        data.push(newSubArt.language);
        queryString += atomicQueryString;
    });

    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, subArticles) => err ? reject(err) : resolve(subArticles)))
}

// requete : update des subArticles
SubArticle.updateSubArticlesPromise = (majSubArticles) =>
{
    let data = [];
    let atomicQueryString =  "update subArticles set titre = ?, description = ?,richTextData = ?,videoLink = ? ,language = ? WHERE idSubArticle = ?;";
    let queryString = "";
    majSubArticles.forEach(upSubArt => 
    {
        data.push(upSubArt.titre);
        data.push(upSubArt.description);
        data.push(upSubArt.richTextData);
        data.push(upSubArt.videoLink);
        data.push(upSubArt.language);
        data.push(upSubArt.idSubArticle)
        queryString += atomicQueryString;
    });

    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, subArticles) => err ? reject(err) : resolve(subArticles)))
}

module.exports = SubArticle;