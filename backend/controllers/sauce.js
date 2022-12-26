// Importation du "models/Sauce.js"
const Sauce = require('../models/Sauce');

/// Importation du module Node fs ('file system') de Node permettant de créer, 
//de stocker, d'accéder, gérer et interagir avec le système de fichiers.
const fs = require('fs');

//Exportation de la fonction getAllSauces pour récupérer toutes les sauces
//Méthode en en lecture seule utilisée pour récupérer les données du serveur.
exports.getAllSauces = (req, res, next) => {
  //Utilistaion de la méthode find pour obtenir la liste des sauces (Array) trouvées dans la BD
  Sauce.find()
    // Si trouvé, envoi d'un array de toutes les données (sauces)
    .then(sauces => res.status(200).json(sauces))
    //Sinon renvoi d'un message d'erreur 400 (Bad Request), signifie que la requête envoyée par
    //l’utilisateur au serveur est erronée ou corrompue et que le serveur se retrouve
    //incapable de la traiter.
    .catch(error => res.status(400).json({ error }));
};

//Exportation de la fonction getOneSauce pour récupérer une seule sauce en se servant de son ID
exports.getOneSauce = (req, res, next) => {
  //Utilisation de la méthode findOne avec l'objet de comparaison pour trouver la "bonne sauce"
  Sauce.findOne({ _id: req.params.id })
    // Si trouvée, envoi d'une réponse (200, indique la réussite d'une requête) et de l'objet
    .then(sauce => res.status(200).json(sauce))
    // Sinon envoi d'une erreur 404 (signale que la ressource demandée, n'a pas été trouvée)
    .catch(error => res.status(404).json({ error }));
};

//Exportation de la fonction createSauce pour la création d'une nouvelle sauce
//Analyse à l'aide de JSON.parse() pour obtenir un objet utilisable.
//Suppression du champ_userId de la requête envoyée par le client pour éviter qu'il utilise le userId d'une autre personne
//Remplacement en base de données par le _userId extrait du token par le middleware d’authentification.
//Résolution de l'URL complète de l'image, car req.file.filename ne contient que le segment filename.
//Utilisation de req.protocol pour obtenir le premier segment (dans ce cas 'http').
//Ajout de '://', puis ytilisation de req.get('host') pour résoudre l'hôte du serveur
//(ici, 'localhost:3000'). Ajout finalement de '/images/' et du nom de fichier pour compléter l'URL.
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  // Création d'un nouvel objet Sauce
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    // Création de l'URL de l'image: http://localhost:3000/image/nomdufichier 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // Enregistrement de l'objet sauce dans la base de données
  sauce.save()
    //Si création réussie, envoi d'un message (statut 200, indique la réussite d'une requête)
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    //Sinon renvoi d'un message d'erreur 400 (Bad Request)
    .catch(error => res.status(400).json({ error }));
};

// Exportation de la fonction modifySauce pour mettre à jour (update) une sauce existante
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


//Exportation de la fonction deleteSauce pour supprimer une sauce existante
//Utilisation de l'ID reçue comme paramètre pour accéder à la sauce correspondante
//dans la base de données.
//Vérification si l’utilisateur qui a fait la requête de suppression est bien celui qui a créé la sauce.
//Utilisation du fait de savoir que l'URL d'image contient un segment /images/ pour séparer le nom de fichier.
//Utilisation de la fonction unlink du package fs pour supprimer ce fichier, en lui passant
//le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé.
//Dans le callback, nous implémentation de la logique d'origine en supprimant la sauce
//de la base de données.
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            //Si suppression réussie, envoi d'un message (statut 200, indique la réussite d'une requête)
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            //Sinon renvoi d'un message d'erreur 400 (Bad Request)
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

// Exportation de la fonction like ou dislike 
exports.likeOrDislike = (req, res, next) => {
  // Si l'utilisateur aime la sauce
  if (req.body.like === 1) {
    // On ajoute 1 like et on l'envoie dans le tableau "usersLiked"
    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
      .then((sauce) => res.status(200).json({ message: 'Like ajouté !' }))
      .catch(error => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    // Si l'utilisateur n'aime pas la sauce
    // On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"
    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
      .then((sauce) => res.status(200).json({ message: 'Dislike ajouté !' }))
      .catch(error => res.status(400).json({ error }));
  } else {
    // Si like === 0 l'utilisateur supprime son vote
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        // Si le tableau "userLiked" contient l'ID de l'utilisateur
        if (sauce.usersLiked.includes(req.body.userId)) {
          // On enlève un like du tableau "userLiked" 
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
            .then((sauce) => { res.status(200).json({ message: 'Like supprimé !' }) })
            .catch(error => res.status(400).json({ error }))
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          // Si le tableau "userDisliked" contient l'ID de l'utilisateur
          // On enlève un dislike du tableau "userDisliked" 
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
            .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
            .catch(error => res.status(400).json({ error }))
        }
      })
      .catch(error => res.status(400).json({ error }));
  }
};