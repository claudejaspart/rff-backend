const sql = require("./db");

// constructeur
const Tag = (tag)=>
{
    this.idTag = tag.idTag,
    this.libelle = tag.libelle,
    this.language = tag.language
}

Tag.findById = (idArticle, result) => 
{
    sql.query(`SELECT * FROM hasTags ht inner join tags t on t.idTag = ht.idTag WHERE ht.idArticle = ${idArticle}`, (err, res) => 
    {
        if (err) 
        {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) 
        {
            console.log("tags trouvés: ", res);
            result(null, res);
            return;
        }

        // aucun tags trouvés
        result({ kind: "not_found" }, null);
    });
};

module.exports = Tag;