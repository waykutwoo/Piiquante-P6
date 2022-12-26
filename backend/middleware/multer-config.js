// Importation de MULTER qui est un package de gestion de fichiers.
const multer = require('multer');

// Dictionnaires des types MIME des extension des fichiers
//qu'on peut trouver dans le frontend
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


//Création d'une constante storage , à passer à multer comme configuration,
//qui contient la logique nécessaire pour indiquer à multer où enregistrer
//les fichiers entrants
//La méthode diskStorage() configure le chemin et le nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({
    // La fonction destination indique à multer d'enregistrer
    //les fichiers dans le dossier images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //La fonction filename indique à multer d'utiliser le nom d'origine,
    //de remplacer les espaces par des underscores et d'ajouter
    //un timestamp Date.now() comme nom de fichier.
    //Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre
    //l'extension de fichier appropriée.
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

// Exportation de MULTER configuré, en lui passant la constante storage,
//et en lui indiquant que nous gérerons uniquement les téléchargements de fichiers image.
//La méthode single() crée un middleware qui capture les fichiers d'un certain type
//(passé en argument), et les enregistre au système de fichiers du serveur
//à l'aide du storage configuré.
module.exports = multer({ storage }).single('image');