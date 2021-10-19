const sql = require("./db");

// constructeur
const User = (user)=>
{
    this.idUtilisateur = user.idUtilisateur,
    this.nom = user.nom,
    this.prenom = user.prenom,
    this.pseudo = user.pseudo,
    this.email = user.email,
    this.token = user.token,
    this.role = user.role
}

module.exports = User;