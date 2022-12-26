// Importation de MONGOOSE
const mongoose = require('mongoose');

// Création d'un schema de donnée Sauce pour le stockage la base de données MongoDB
const sauceSchema = mongoose.Schema({
  // identifiant unique MongoDB pour l'utilisateur qui a créé la sauce object
    userId: { type: String, required: true },
    // nom de la sauce
    name: { type: String, required: true },
     // fabricant de la sauce
    manufacturer: { type: String, required: true },
     // description de la sauce
    description: { type: String, required: true },
     // principal ingrédient dans la sauce
    mainPepper: { type: String, required: true },
     // Image de la sauce téléchargée par l'utilisateur
    imageUrl: { type: String, required: true },
     // Note de 1 à 10 décrivant la "puissance" de la sauce
    heat: { type: Number, required: true },
    // Nombre d'utilisateurs qui aiment la sauce
    likes: { type: Number, default: 0 }, 
    // Nombre d'utilisateurs qui n'aiment pas la sauce
    dislikes: { type: Number, default: 0 }, 
    // Tableau d'identifiants d'utilisateurs ayant aimé la sauce
    usersLiked: { type: [String] }, 
    // Tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
    usersDisliked: { type: [String] }, 
  });

  // Exportation du schema de donnée Sauce
  //à l'aide de la méthode  model qui le transforme en un modèle utilisable.
  module.exports = mongoose.model('Sauce', sauceSchema);