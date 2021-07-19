const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('../../controller/userController');

const app = express();

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());

app.post('/users', userController.userRegister);
app.post('/login', userController.userLogin);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use((err, req, res, _next) => {
  if (!err.status) return res.status(500).json({ status: 500, message: err });
  res.status(err.status).json({ message: err.message });
});

module.exports = app;
