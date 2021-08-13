const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const userRoute = require('../routes/user');

app.use(bodyParser);

const router = express.Router();

app.use(rescue(router));
router.use('/users', userRoute);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
