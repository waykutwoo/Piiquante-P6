
//Importation de MONGOOSE
const mongoose = require('mongoose');

//Importation de mongoose-unique-validator
//plugin qui ajoute une validation de pré-enregistrement pour les champs uniques
//dans un schéma Mongoose, ce qui permet de ne valider q'un seul email par utilisateur
const uniqueValidator = require('mongoose-unique-validator');

//Création d'un schéma de données pour la base de données MongoDB
//qui contient les champs souhaités pour le model user
//indique leur type ainsi que leur caractère (obligatoire ou non)
//utilise la méthode Schema mise à disposition par Mongoose
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator
//passé comme plug-in, s'assurera que deux utilisateurs ne puissent
//partager la même adresse e-mail.
userSchema.plugin(uniqueValidator);

//Exportation de ce schéma en tant que modèle Mongoose appelé « User »,
//le rendant par là même disponible pour notre application Express
//à l'aide de la méthode  model qui le transforme en un modèle utilisable.
module.exports = mongoose.model('user', userSchema);


