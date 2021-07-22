const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const userController = require('../Controllers/userController');
const loginController = require('../Controllers/loginController');
const recipesController = require('../Controllers/recipesController');
const { auth } = require('../Middlewares/recipesMidlleware');

const app = express();
app.get('/', (request, response) => {
  response.send('aaa');
});

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads/'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', userController.addUser);
app.post('/login', loginController);
app.post('/recipes', auth, recipesController.addRecipe);
app.get('/recipes/:id', recipesController.getRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.put('/recipes/:id', auth, recipesController.updateRecipe);
app.delete('/recipes/:id', auth, recipesController.delRecipe);
app.put('/recipes/:id/image', auth, upload.single('image'),
  recipesController.updateRecipeWithImage);

//  consultei o commit de meu colega Arnaelcio para criação 
//  do updateRecipeWithImage e uso do Multer
//  https://github.com/tryber/sd-08-cookmaster/pull/77/commits/8d4fb0bacb42ef8808841b0d10e652383c614969
//  as modificações do use para adequação da rota foram propostas por Ana Karine 
//  https://github.com/tryber/sd-08-cookmaster/pull/70/files

module.exports = app;
