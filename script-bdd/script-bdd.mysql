CREATE TABLE `Utilisateurs` (
  `idUtilisateur` int,
  `nom` varchar(255),
  `prenom` varchar(255),
  `pseudo` varchar(255),
  `email` varchar(255),
  `token` varchar(2048),
  `role` varchar(255),
  PRIMARY KEY (`idUtilisateur`)
);

CREATE TABLE `Articles` (
  `idArticle` int,
  `datepublication` datetime,
  `level` int,
  `idTags` varchar(50),
  `idSubArticle` int,
  `idProduits` int,
  PRIMARY KEY (`idArticle`)
);


CREATE TABLE `Produits` (
  `idProduit` int,
  `libelle` varchar(255),
  `description` varchar(255),
  `imageLink` varchar(2048),
  `productLink` varchar(2048),
  `idArticle` int,
  PRIMARY KEY (`idProduit`)
);

CREATE TABLE `subArticle` (
  `idSubArticle` int,
  `titre` varchar(255),
  `description` varchar(2048),
  `richTextData` longtext,
  `videolink` varchar(2048),
  `language` varchar(2),
  ` idArticle` int,
  PRIMARY KEY (`idSubArticle`)
);

CREATE TABLE `Tags` (
  `idTag` int,
  `libelle` varchar(50),
  `language` varchar(2),
  `idArticle` int,
  PRIMARY KEY (`idTag`)
);




CREATE TABLE `hasSubArticles` (
  `id` int,
  `idArticle` int,
  `idSubArticle` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `hasProducts` (
  `id` int,
  `idArticle` int,
  `idProduct` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `hasTags` (
  `id` int,
  `idArticle` int,
  `idTag` int,
	PRIMARY KEY (`id`)
);