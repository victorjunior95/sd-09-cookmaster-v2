const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const createUser = require('../controllers/createUser');
const login = require('../controllers/login');
const createRecipe = require('../controllers/createRecipe');
const validateToken = require('../auth/validateToken');
const getRecipes = require('../controllers/getRecipes');
const getRecipeById = require('../controllers/getRecipeById');
const updateRecipe = require('../controllers/updateRecipe');
const deleteRecipeById = require('../controllers/deleteRecipeById');
const uploadPictures = require('../controllers/uploadPictures');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
   destination: path.join(__dirname, '..', 'uploads'),
   filename: (req, file, callback) => {
     const { id } = req.params;
 
     if (!id) {
       return callback(new Error('missing "id"'));
     }
 
     callback(null, `${id}.jpeg`);
   },
 });

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// New User
app.post('/users', createUser);

// Login
app.post('/login', login);

// Recipies
app.get('/recipes', getRecipes)
   .post('/recipes', validateToken, createRecipe);

app.get('/recipes/:id', getRecipeById)
   .put('/recipes/:id', validateToken, updateRecipe)
   .delete('/recipes/:id', validateToken, deleteRecipeById);

app.put('/recipes/:id/image', validateToken, upload.single('image'), uploadPictures);
   
module.exports = app;
