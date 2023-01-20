//Importation d'Express
const express = require("express");

// Création d'un routeur avec la méthode d'EXPRESS
const router = express.Router();

//Importation du controller qui associe les fonctions aux différentes routes
const userCtrl = require("../controllers/user");

// Création des routes SignUp et Login (fournies par le frontend)

// Création d'un nouvel utilisateur avec une route post et la méthode SignUp
router.post("/signup", userCtrl.signup);

// Création de la connexion d'un utilisateur avec une route post et la méthode Login
router.post("/login", userCtrl.login);

// Exportation du routeur vers app.js
module.exports = router;
