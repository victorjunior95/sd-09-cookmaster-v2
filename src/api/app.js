const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const User = require('../controllers/user');
const Login = require('../controllers/login');
const Recipes = require('../controllers/recipes');
const Admin = require('../controllers/admin');

const { memoryUpload } = require('../middlewares/upload');

// Users
app.route('/users').post(User);

// Login
app.route('/login').post(Login);

// Recipes
app.route('/recipes').post(Recipes.create).get(Recipes.list);

app
  .route('/recipes/:id')
  .get(Recipes.listById)
  .put(Recipes.edit)
  .delete(Recipes.drop);

app
  .route('/recipes/:id/image/')
  .put(memoryUpload.single('image'), Recipes.uploadPicture);

// acessando arquivo estático, passando o local onde se encontra a imagem
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app
  .route('/users/admin')
  .post(Admin);

// Error
const errorMiddleware = require('../middlewares/error');

app.use(errorMiddleware);

module.exports = app;
