const sql = require("./db");

// constructeur
const SubArticle = (subArticle)=>
{
    this.idSubArticle = subArticle.idSubArticle,
    this.titre = subArticle.titre,
    this.description = subArticle.description,
    this.richTextData = subArticle.richTextData,
    this.videoLink = subArticle.videoLink,
    this.language = subArticle.language 
}

module.exports = SubArticle;