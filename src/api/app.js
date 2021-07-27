const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Users
const User = require('../controllers/user');

app.route('/users').post(User);

// Login
const Login = require('../controllers/login');

app.route('/login').post(Login);

// Recipes
const Recipes = require('../controllers/recipes');
const { memoryUpload } = require('../middlewares/upload');

app.route('/recipes')
  .post(Recipes.create)
  .get(Recipes.list);

app
  .route('/recipes/:id')
  .get(Recipes.listById)
  .put(Recipes.edit)
  .delete(Recipes.drop);

app
  .route('/recipes/:id/image/')
  .put(memoryUpload.single('image'), Recipes.uploadPicture);

// Error
const errorMiddleware = require('../middlewares/error');

app.use(errorMiddleware);

module.exports = app;
