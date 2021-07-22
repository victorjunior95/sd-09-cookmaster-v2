const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();

const usersRouter = require('../../routes/users');
const errorMiddleware = require('../../controller/error');
const loginController = require('../../controller/login');

app.use(bodyParser);

const router = express.Router();

app.use(rescue(router));
router.use('/users', usersRouter);

router.post('/login', loginController.userLogin);

app.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
