const express = require('express');
const bodyParser = require('body-parser').json();
const multer = require('multer');
const errorMiddleware = require('../middlewares/error');
const Users = require('../Controllers/usersController');
const Recipes = require('../Controllers/recipesController');
const { recipeValidate } = require('./auth/validateJWT');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/users', Users.userCreate);
app.post('/login', Users.userLogin);
app.post('/recipes', recipeValidate, Recipes.recipeCreate);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.getOne);
app.put('/recipes/:id', recipeValidate, Recipes.recipeUpdate);
app.delete('/recipes/:id', recipeValidate, Recipes.recipeDelete);
app.put('/recipes/:id/image/', upload.single('image'), recipeValidate, Recipes.imageCreate);
app.use(errorMiddleware);

module.exports = app;
