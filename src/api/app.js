const express = require('express');
const bodyParser = require('body-parser').json();
const multer = require('multer');
const controller = require('../controller');
const validateJWT = require('./auth/validateJWT');

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

app.use(bodyParser);
app.use(express.static(`${__dirname}/src/uploads`));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controller.users.signIn);
app.post('/login', controller.users.login);
app.post('/recipes', validateJWT, controller.recipes.postRecipe);
app.get('/recipes', controller.recipes.getAll);
app.get('/recipes/:id', controller.recipes.getById);
app.put('/recipes/:id', validateJWT, controller.recipes.updateRecipe);
app.delete('/recipes/:id', validateJWT, controller.recipes.deleteRecipe);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), controller.recipes.uploadImage);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
