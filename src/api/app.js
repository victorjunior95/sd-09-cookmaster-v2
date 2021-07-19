const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const errorMiddleware = require('../../controller/error');

app.use(bodyParser);

const router = express.Router();

const usersRouter = require('../../routes/users');

app.use(rescue(router));
router.use('/users', usersRouter);
router.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
