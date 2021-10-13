CREATE TABLE `Utilisateurs` (
  `idUtilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255),
  `prenom` varchar(255),
  `pseudo` varchar(255),
  `email` varchar(255),
  `token` varchar(2048),
  `role` varchar(255),
  PRIMARY KEY (`idUtilisateur`)
);

CREATE TABLE `Articles` (
  `idArticle` int NOT NULL AUTO_INCREMENT,
  `datepublication` datetime,
  `level` int,
  `idTags` varchar(50),
  `idSubArticle` int,
  `idProduits` int,
  PRIMARY KEY (`idArticle`)
);


CREATE TABLE `Produits` (
  `idProduit` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255),
  `description` varchar(255),
  `imageLink` varchar(2048),
  `productLink` varchar(2048),
  `idArticle` int,
  PRIMARY KEY (`idProduit`)
);

CREATE TABLE `subArticle` (
  `idSubArticle` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255),
  `description` varchar(2048),
  `richTextData` longtext,
  `videolink` varchar(2048),
  `language` varchar(2),
  `idArticle` int,
  PRIMARY KEY (`idSubArticle`)
);

CREATE TABLE `Tags` (
  `idTag` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50),
  `language` varchar(2),
  `idArticle` int,
  PRIMARY KEY (`idTag`)
);




CREATE TABLE `hasSubArticles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idArticle` int,
  `idSubArticle` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `hasProducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idArticle` int,
  `idProduct` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `hasTags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idArticle` int,
  `idTag` int,
	PRIMARY KEY (`id`)
);