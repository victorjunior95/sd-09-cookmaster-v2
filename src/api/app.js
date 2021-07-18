const express = require('express');
const rescue = require('express-rescue');
const bodyParse = require('body-parser');
const path = require('path');

const controllers = require('./controllers');
const errorMiddlewares = require('./errorMiddlewares');

const app = express();

app.use(bodyParse.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/recipes/:id', rescue(controllers.getRecipeByIdController));
app.get('/recipes', rescue(controllers.getRecipesAllController));

app.post('/users', rescue(controllers.createUserController));
app.post('/login', rescue(controllers.loginController));
app.post('/recipes', rescue(controllers.createRecipeController));

app.put('/recipes/:id/image', controllers.updateUrlImageRecipeController);
app.put('/recipes/:id', rescue(controllers.updateRecipeController));

app.delete('/recipes/:id', rescue(controllers.deleteRecipeController));

app.use(errorMiddlewares);

module.exports = app;
