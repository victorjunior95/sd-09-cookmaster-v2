const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');
const path = require('path');
const UsersRouter = require('../rotes/Users');
const LoginRouter = require('../rotes/Login');
const RecipesRouter = require('../rotes/Recipes');

const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './uploads');
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(UsersRouter);
app.use(LoginRouter);
app.use(RecipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
