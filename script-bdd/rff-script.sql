/* MIS A JOUR 22/10/2021
/* SUPPRESSION DES TABLES */
use rff;
drop table Utilisateurs;
drop table Articles;
drop table subArticles;
drop table Produits;
drop table SubProduits;
drop table Tags;
drop table hasSubArticles;
drop table hasProduits;
drop table hasSubProduits;
drop table hasTags;

/* CREATION DES TABLES */
use rff;

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
  `datePublication` datetime,
  `level` int,
  PRIMARY KEY (`idArticle`)
);


CREATE TABLE `subArticles` (
  `idSubArticle` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255),
  `description` varchar(2048),
  `richTextData` longtext,
  `videoLink` varchar(2048),
  `language` varchar(2),
  PRIMARY KEY (`idSubArticle`)
);

CREATE TABLE `Produits` (
  `idProduit` int NOT NULL AUTO_INCREMENT,
  `imageLink` varchar(2048),
  `produitLink` varchar(2048),
  PRIMARY KEY (`idProduit`)
);

CREATE TABLE `subProduits` (
  `idSubProduit` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255),
  `description` varchar(255),
  `language` varchar(2),
  PRIMARY KEY (`idSubProduit`)
);


CREATE TABLE `Tags` (
  `idTag` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50),
  `language` varchar(2),
  PRIMARY KEY (`idTag`)
);

CREATE TABLE `hasSubArticles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idArticle` int,
  `idSubArticle` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `hasProduits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idArticle` int,
  `idProduit` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `hasSubProduits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idProduit` int,
  `idSubProduit` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `hasTags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idArticle` int,
  `idTag` int,
	PRIMARY KEY (`id`)
);

/* PEUPLEMENT DES TABLES */

INSERT INTO utilisateurs(nom, prenom, pseudo, email, token, role) VALUES
('JASPART', 'Claude', 'ClaudioLePro', 'claude.a.jaspart@gmail.com', 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51', 'admin');

INSERT INTO subarticles(titre, description, richTextData, videoLink, language) VALUES 
('premier exercice', 'voilà le premier exercice', 'bonjour', 'https://www.youtube.com/watch?v=QL00bOOwb8s', 'fr'),
('first exercise', 'here is the first exercise', 'hello', 'https://www.youtube.com/watch?v=QL00bOOwb8s', 'en'),
('deuxième exercice', 'voilà le deuxième exercice', 'bienvenue', 'https://www.youtube.com/watch?v=QL00bOOwb8s', 'fr'),
('second exercise', 'here is the second exercise', 'welcome', 'https://www.youtube.com/watch?v=QL00bOOwb8s', 'en'),
('troisième exercice', 'voilà le troisième exercice', 'au revoir', 'https://www.youtube.com/watch?v=QL00bOOwb8s', 'fr'),
('third exercise', 'here is the third exercise', 'goodbye', 'https://www.youtube.com/watch?v=QL00bOOwb8s', 'en');

INSERT INTO tags(libelle, language) VALUES 
('robotique', 'fr'),
('moteur', 'fr'),
('composant', 'fr'),
('robotics', 'en'),
('motor', 'en'),
('component', 'en'),
('brique', 'fr'),
('servo-moteur', 'fr'),
('ciel', 'fr'),
('tutoriel', 'fr'),
('brick', 'en'),
('servo-motor', 'en'),
('sky', 'en'),
('tutorial', 'en');

INSERT INTO produits(imageLink, produitLink) VALUES
('https://www.amazon.fr/images/I/61FTzWXlcwL._AC_SL1000_.jpg',
 'https://www.amazon.fr/diymore-Moteur-H%C3%A9licopt%C3%A8re-Voiture-T%C3%A9l%C3%A9commande/dp/B07KFXYDHF/ref=sr_1_1_sspa?crid=23W0JFAC59S2A&dchild=1&keywords=servomoteur%2Barduino&qid=1634139351&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzRUtQTE9GVjlZVDBSJmVuY3J5cHRlZElkPUEwNjAzNjQ1NERQUUcyMUY1RllKJmVuY3J5cHRlZEFkSWQ9QTEwMjg1NjUzNjdWN0VFNEo1SzE1JndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&th=1'),
 ('https://www.amazon.fr/images/I/71+OrCHG1EL._AC_SL1500_.jpg', 
 'https://www.amazon.fr/Makeblock-programmable-%C3%A9ducatif-%C3%89ducation-Bluetooth/dp/B07XR98YYQ?ref_=ast_sto_dp&th=1');
 
INSERT INTO articles(datePublication, level) VALUES
('2021-10-12 18:47:35', 2),
('2021-10-13 14:49:35', 3);

INSERT INTO articles(datePublication, level) VALUES
('2021-10-14 10:50:35', 1);

INSERT INTO subProduits(libelle, description, language) VALUES
('diymore 6 PCS SG90 9G Micro Servo Moteur Hélicoptère', 
'Le SG90 est un servo de haute qualité à faible coût qui répond à tous vos besoins en matière de mécatronique. 
Il est livré avec un câble dalimentation et de contrôle à 3 broches, ainsi que du matériel de montage.', 'fr'),
('diymore 6 Pcs SG90 9G Micro Servos for RC Robot Helicopter',
'The SG90 is a high quality, low cost servo that meets all your mechatronics needs. It comes with a 3-pin power and control cable, as well as mounting hardware', 'en');

INSERT INTO subProduits(libelle, description, language) VALUES
('Makeblock mBot Kit de Voiture de Robot, Kit de Robot de Codage avec Programmation Scratch / Arduino',
'mBot est un robot éducatif STEAM pour les débutants, qui rend lenseignement et lapprentissage de la programmation des robots simple et amusant.', 'fr'),
('Makeblock mBot Robot Car Kit, Coding Robot Kit with Scratch / Arduino Programming',
'mBot is a STEAM educational robot for beginners that makes teaching and learning robot programming easy and fun.', 'en');

 INSERT INTO hasSubArticles(idArticle, idSubArticle) VALUES 
 (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6);
 
INSERT INTO hasProduits(idArticle, idProduit) VALUES 
(1, 1), (2, 2);

INSERT INTO hastags(idArticle, idTag) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14);

INSERT INTO hasSubProduits(idProduit, idSubProduit) VALUES 
(1, 1), (1, 2), (2, 3), (2, 4);