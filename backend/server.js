//importation du package http natif de Node
const http = require('http');

//importation de l'application sur le serveur
const app = require('./app');

// Renvoie d'un port valide
// NormalizePort renvoie un port valide,
//qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Si aucun port n'est fourni on écoutera sur le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Gestion des erreurs
// ErrorHandler recherche les différentes erreurs et les gère de manière appropriée
// Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// création du serveur
const server = http.createServer(app);

// Écoute et gestion des évenements, consignant le port ou le canal nommé sur lequel
//le serveur s'exécute dans la console

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Le serveur écoute le port définit
server.listen(port);
