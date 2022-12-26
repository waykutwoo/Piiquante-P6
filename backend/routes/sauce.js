//Importation d'Express
const express = require('express');

//Création du routeur avec la méthode mise à disposition par Express (express.Router)
const router = express.Router();

//importation du controlleur qui associe les fonctions aux différentes routes
const sauceCtrl = require('../controllers/sauce');


// Importation du middleware AUTH pour sécuriser les routes
const auth = require('../middleware/auth');

// Importation du middleware MULTER pour la gestion des images
const multer = require('../middleware/multer-config');

// Création des différentes ROUTES  de l'API (pour les sauces)

// Route qui permet de récupérer et d'afficher toutes les sauce (tableau) dans la base de données
router.get('/', auth, sauceCtrl.getAllSauces);

// Route qui permet de selectionner une sauce avec son ID
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Route pour créer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

// Route qui permet de modifier une sauce ainsi que changer son image avec imageUrl de la sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Route qui permet de supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Route qui permet de gerer les likes et les dislikes des sauces
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

// Exportation du ROUTER vers app.js
module.exports = router;