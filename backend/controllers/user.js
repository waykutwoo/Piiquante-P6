//Importation de BCRYPT pour hasher le mot de passe des utilisateurs
//bcrypt est une fonction adaptative de hachage basée sur un algorithme de chiffrement,
//utilisant le salage (méthode permettant de renforcer la sécurité des informations
//qui sont destinées à être hachées) en y ajoutant une donnée supplémentaire
//afin d’empêcher que deux informations identiques ne conduisent à la même empreinte
//Protège des attaques par table arc-en-ciel (rainbow table, possibilité de voler efficacement
//les mots de passe des systèmes) et par force brute (méthode utilisée pour trouver un mot de passe ou une clé.
//Il s'agit de tester, une à une, toutes les combinaisons possibles)
const bcrypt = require('bcrypt')

// RImportation du models/User.js, créer avec le schéma MONGOOSE
const User = require('../models/user');

// Utilisation de jsonwebtoken pour attribuer un token au moment de la connexion
const jwt = require('jsonwebtoken');

//Rappel de la fonction de hachage de bcrypt dans le mot de passe et "salage" du mot de passe
//10 fois (plus la valeur est élevée, plus l'exécution de la fonction sera longue,
//et plus le hachage sera sécurisé.
//C'est une onction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré dans
//le bloc then , Création d'un utilisateur et enregistrement dans la base de données,
//en renvoyant une réponse de réussite en cas de succès,
//et des erreurs avec le code d'erreur en cas d'échec. 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Utilisation du modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond
//à un utilisateur existant de la base de données
//Dans le cas contraire, envoid'une erreur 401 Unauthorized.
//Si l'e-mail correspond à un utilisateur existant, utilisation de la fonction compare de bcrypt
//pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré
//dans la base de données, si ils ne correspondent pas, renvoi d'une erreur 401 Unauthorized
//avec le même message que lorsque l’utilisateur n’a pas été trouvé,
//afin de ne pas laisser quelqu’un vérifier si une autre personne est inscrite sur notre site.
//Si ils correspondent, les informations d'identification de notre utilisateur sont valides.
//Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'Paire login/mot de passe incorrecte'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Paire login/mot de passe incorrecte'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};