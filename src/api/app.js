const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

const routes = require('./routes');

const apiRoutes = express.Router();

app.use(apiRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/users/admin', routes.createAdmin);
apiRoutes.post('/login', routes.login);

module.exports = app;
