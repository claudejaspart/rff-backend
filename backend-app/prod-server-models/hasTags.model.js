const sql = require("./db");

// constructeur
const hasTags = (hasTags) =>
{
    this.id = hasTags.id,
    this.idArticle = hasTags.idArticle,
    this.idTag = hasTags.idTag
}


// ajoute une relation entre le produit et les sous-TagshasTags
hasTags.linkArticleWithTagsPromise = (idArticle, oldTags, tags) =>
{
    let data = [];
    let atomicQueryString =  "INSERT INTO hasTags (idArticle,idTag) VALUES (?,?);";
    let queryString = "";

    for (let i=0; i < tags.length; i++) 
    {
        data.push(idArticle);

        if (tags[i].insertId > 0)
        {
            // tags insérés
            data.push(tags[i].insertId);
        }
        else
        {
            // tags updatés
            data.push(oldTags[i].idTag);
        }

        queryString += atomicQueryString;
    };
    
    return new Promise((resolve, reject)=> sql.query(queryString, data, (err, queryhastags) => err ? reject(err) : resolve(queryhastags)))
};


module.exports = hasTags;