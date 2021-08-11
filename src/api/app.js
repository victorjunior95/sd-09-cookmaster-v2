const express = require('express');
const bodyParser = require('body-parser').json();
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const { validateToken, validateUser } = require('../middlewares/validation');

const app = express();
app.use(bodyParser);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.registerUserControllers);

app.post('/login', usersController.userLoginControllers);

app.post('/recipes', validateToken, recipesController.registerRecipeControllers);

app.get('/recipes', recipesController.getRecipesControllers);

app.get('/recipes/:id', recipesController.getByIdRecipeControllers);

app.put('/recipes/:id', validateToken, validateUser,
  recipesController.editRecipeControllers);

app.put('/recipes/:id/image', upload.single('image'), validateToken,
  recipesController.addImageControllers);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.delete('/recipes/:id', validateToken, validateUser,
  recipesController.delRecipeControllers);

module.exports = app;
