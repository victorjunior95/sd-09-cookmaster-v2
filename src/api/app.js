const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const path = require('path');

const usersRouter = require('../../routes/users');
const recipesRouter = require('../../routes/recipes');
const errorMiddleware = require('../../controller/error');
const loginController = require('../../controller/login');

app.use(bodyParser);

const router = express.Router();

app.use(rescue(router));
router.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);
router.post('/login', loginController.userLogin);

app.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
