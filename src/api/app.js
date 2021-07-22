const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { resolve } = require('path');
const userController = require('../Controllers/userController');
const loginController = require('../Controllers/loginController');
const recipesController = require('../Controllers/recipesController');
const { auth } = require('../Middlewares/recipesMidlleware');

const app = express();
app.use(express.json());
app.get('/', (request, response) => {
  response.send('aaa');
});

app.use(express.static(resolve(__dirname, 'uploads')));

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads/'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/users', userController.addUser);
app.post('/login', loginController);
app.post('/recipes', auth, recipesController.addRecipe);
app.get('/recipes/:id', recipesController.getRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.put('/recipes/:id', auth, recipesController.updateRecipe);
app.delete('/recipes/:id', auth, recipesController.delRecipe);
app.put('/recipes/:id/image', auth, upload.single('image'),
  recipesController.updateRecipeWithImage);

module.exports = app;
