# Projet 6 de la formation Développeur Web d'OpenClassRooms  
-----------------  
## PIIQUANTE
<p align="center">
<img width="380" height="173" ![Piiquante] src = "https://github.com/sandrine42/Piiquante/blob/main/img/logo_piiquante.png" >
</p>

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.  
## Création d’une API sécurisée pour une application d'évaluation  

### Technologies utilisées :  
* Node.JS v16.16.0  
* "bcrypt": "^5.0.1"  
* "dotenv": "^16.0.1"  
* "express": "^4.18.1"  
* "helmet": "^5.1.0"  
* "jsonwebtoken": "^8.5.1"  
* "mongoose": "^6.4.4"  
* "mongoose-unique-validator": "^3.1.0"  
* "multer": "^1.4.5-lts.1"  
* MongoDB Atlas

Utilisation des variables d'environnement pour les coordonnées de la BDD :
fichier .env :  
`DB_URI=mongodb://<Adresse du serveur>:<Port>/<Nom base de donnees>`  
### Pour que cela fonctionne :  
#### A. Frontend :

Retirez le code de l'application front-end du repository du projet
(https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)
et suivez les étapes suivantes :

1. Clonez le repository
2. Ouvrez un terminal (Linux/Mac) ou une invite de commande/PowerShell
(Windows)
3. Exécutez npm install à partir du répertoire du projet
4. Exécutez npm start
5. Exécutez le back-end sur http://localhost:3000 seulement

Si vous utilisez VSCode, utilisez l'extension LiveShare pour faire fonctionner le
serveur front-end sans avoir recours à npm install

#### B. Backend :

* "Dezipper" le fichier zip contenant le code de l'API

#### C. Créer un dossier PIIQUANTE dans lequel vous déposerez le dossier frontent et le dossier backend

#### D. Vous trouverez le projet PIIQUANTE complet (frontend et backend) à l'adresse suivante (sans le fichier.env)
https://github.com/sandrine42/Piiquante.git  
vous devrez donc remplacer : `DB_URI=mongodb://<Adresse du serveur>:<Port>/<Nom base de donnees>`  
par l'adresse de votre base de données

#### E. Démarrer le serveur sur le dossier backend (Listening on port 3000)

* cd backend  
* npm install  
* npm start
* nodemon server

#### F. Démarrer le serveur sur le dossier frontend (http://localhost:4200/)

* cd frontend  
* npm install
* npm start

