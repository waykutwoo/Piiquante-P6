// Importation d'express
//framework pour construire des applications web basées sur Node.js
const express = require('express');

//Importation de MONGOOSE
//bibliothèque de programmation orientée objet JavaScript
//qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js.
const mongoose = require('mongoose');

//Importation de path
// module de chemin (de nœud) de Node.js
// il fournit des fonctions utiles pour interagir avec les chemins de fichiers
const path = require('path');

//Importation de HELMET
//module qui aide à sécuriser les en-têtes HTTP renvoyés par les applications Express. 
const helmet = require('helmet');


//Déclaration des routes

//Importation de la route des sauces
const saucesRoutes = require('./routes/sauce');

//Importation de la route des utilisateurs
const userRoutes = require('./routes/user');

//Importation de DOTENV
//module sans dépendance qui charge les variables d'environnement d'un fichier .env dans process.env.
//ce qui ici permet de masquer les informations de connexion à la base de données
require('dotenv').config();

// Connection à la base de données MongoDB avec MONGOOSE
// en utilisant DOTENV pour masquer les informations de connexion
//enregistrées dans .env et placées dans.gitignore
mongoose.connect('mongodb+srv://koklukaykut:48686327Wayy@clusterp6.f8nyr5s.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'application avec la méthode EXPRESS 
const app = express();

//middleware erreurs CORS ( Cross Origin Resource Sharing)
//système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents
app.use((req, res, next) => {
  //Header qui permet d'accéder à notre API depuis n'importe quelle origine ( '*' )
  res.setHeader('Access-Control-Allow-Origin', '*');
  //Header qui permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  ///Header qui permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware qui permet de gérer la requête POST venant de l'application front-end,
//extrait le corps JSON, mis à disposition par le framework Express.
app.use(express.json());

// Midleware qui permet de gérer la ressource images de manière statique
//avec un sous-répertoire du répertoire de base, __dirname
//chaque fois qu'il reçoit une requête vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Enregistrement des routeurs pour toutes les demandes effectuées vers l'API
// Router pour les sauces
app.use('/api/sauces', saucesRoutes);

// Router pour l'authentification des utilisateurs
app.use('/api/auth', userRoutes);

// Protection contre injection sql, xss
app.use(helmet());

// Export de l'application express pour déclaration dans server.js
module.exports = app;


/*
//Créé un reperpoire pour les images
const mkdirp = require('mkdirp');
mkdirp('images').then(created_folder => console.log(`Le repertoire '${created_folder}' a ete cree!`));
*/