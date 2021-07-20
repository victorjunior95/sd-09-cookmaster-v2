const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const userController = require('../Controllers/userController');
const loginController = require('../Controllers/loginController');
const recipesController = require('../Controllers/recipesController');
const { auth } = require('../Middlewares/recipesMidlleware');

const app = express();

app.get('/', (request, response) => {
  response.send('aaa');
});

app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

app.post('/users', userController.addUser);
app.post('/login', loginController);
app.post('/recipes', auth, recipesController.addRecipe);
app.get('/recipes/:id', recipesController.getRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.put('/recipes/:id', auth, recipesController.updateRecipe);
app.delete('/recipes/:id', auth, recipesController.delRecipe);
app.post('/recipes/:id/image',  upload.single('file'), (req, res) => {
  res.send('OK');
});

module.exports = app;
