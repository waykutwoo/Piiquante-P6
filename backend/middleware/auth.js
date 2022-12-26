// Importation du package "jsonwebtoken" qui permet la création et la verification des TOKEN
//Les tokens d'authentification permettent aux utilisateurs de se connecter une seule fois
//à leur compte. Au moment de se connecter, ils recevront leur token et le renverront
//automatiquement à chaque requête par la suite.
//Ceci permettra au back-end de vérifier que la requête est authentifiée.
const jwt = require('jsonwebtoken');

//Bloc "try...catch", pour "anticiper"" de nombreux problèmes qui peuvent survenir


//Extraction du token du header Authorization de la requête entrante qui contiendra le mot-clé Bearer.
//Utilisation de la fonction split pour tout récupérer après l'espace dans le header.
//Les erreurs générées ici s'afficheront dans le bloc catch.
//Utilisation de la fonction verify pour décoder le token.
//Si celui-ci n'est pas valide, une erreur sera générée.
//Extraction de l'ID utilisateur du token et rajout à l’objet Request afin que nos différentes routes puissent l’exploiter.
//Tout fonctionne et l'utilisateur est authentifié, passage  à l'exécution à l'aide de la fonction next()
//Sinon renvoi d'une erreur 401 (Unauthorized indique que la demande n’a pas été traitée
//en raison de l’absence d’informations d’authentification valides pour la ressource cible)
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};