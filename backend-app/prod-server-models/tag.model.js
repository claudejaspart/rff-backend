const sql = require("./db");

// constructeur
const Tag = (tag)=>
{
    this.idTag = tag.idTag,
    this.libelle = tag.libelle,
    this.language = tag.language
}

Tag.findByIds = (idArticles, result) => 
{
    this.getTagsPromise(idArticles)
    .then(result(null, res))
    .catch(result(err, null));
};

// encapsulation une promise
Tag.getTagsPromise = (idArticles) =>
{
    let tagQuery =      "select idArticle, libelle, language from tags t \
                        inner join hastags ht on ht.idTag = t.idTag \
                        where ht.idArticle in (?) \
                        order by idArticle desc" ;

    return new Promise((resolve, reject)=>sql.query(tagQuery, [idArticles], (err, tags) => err ? reject(err) : resolve(tags)))
};

module.exports = Tag;