const sql = require("./db");

// constructeur
const Tag = (tag) =>
{
    this.idTag = tag.idTag,
    this.libelle = tag.libelle,
    this.language = tag.language
}

Tag.findByIds = (idArticles, result) => 
{
    this.getTagsByIdPromise(idArticles)
    .then(result(null, res))
    .catch(result(err, null));
};

Tag.findAll = (result) => 
{
    getAllTagsPromise()
    .then(tags => result(null, tags))
    .catch(err => result(err, null));
};

// encapsulation une promise
Tag.getTagsByIdPromise = (idArticles) =>
{
    let tagQuery =      "select t.idTag, idArticle, libelle, language from tags t \
                        inner join hastags ht on ht.idTag = t.idTag \
                        where ht.idArticle in (?) \
                        order by idArticle desc" ;

    return new Promise((resolve, reject)=>sql.query(tagQuery, [idArticles], (err, tags) => err ? reject(err) : resolve(tags)))
};

getAllTagsPromise = () =>
{
    let tagQuery = "select idTag, libelle, language from tags order by libelle;";
    return new Promise((resolve, reject)=>sql.query(tagQuery, (err, tags) => err ? reject(err) : resolve(tags)))
};

Tag.insertOrUpdateTagsPromise = (currentTags) =>
{
    let data = [];
    let insertTagQuery =  "INSERT INTO tags(libelle,language) VALUES (?,?);";
    let updateTagQuery =  "UPDATE tags SET libelle = ? WHERE idTag = ?;"
    let queryString = "";
    currentTags.forEach(currentTag => 
    {
        if (currentTag.idTag < 0)
        {
            // insertion        
            data.push(currentTag.libelle);
            data.push(currentTag.language);
            queryString += insertTagQuery;
        }
        else
        {
            // update
            data.push(currentTag.libelle);
            data.push(currentTag.idTag);
            queryString += updateTagQuery;
        }
    });

    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, newTags) => err ? reject(err) : resolve(newTags)))
}

module.exports = Tag;