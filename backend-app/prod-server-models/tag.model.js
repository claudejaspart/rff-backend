const sql = require("./db");

// constructeur
const Tag = (tag)=>
{
    this.idTag = tag.idTag,
    this.libelle = tag.libelle,
    this.language = tag.language
}

module.exports = Tag;