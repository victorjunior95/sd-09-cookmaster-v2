const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/routes');
const UserErrorMiddleware = require('../middlewares/UserErrorMiddleware');
const RecipeErrorMiddleware = require('../middlewares/RecipeErrorMiddleware');
const AdminErrorMiddleware = require('../middlewares/AdminErrorMiddleware');
const ErrorMiddleware = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use(UserErrorMiddleware);
app.use(RecipeErrorMiddleware);
app.use(AdminErrorMiddleware);
app.use(ErrorMiddleware);

module.exports = app;
