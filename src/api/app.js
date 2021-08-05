const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const User = require('../../controller/User');
const Recipe = require('../../controller/Recipe');
const validateJWT = require('./auth/validateJWT');
const storage = require('../../controller/Storage');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'uploads')));

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', User.create);
app.post('/login', User.login);
app.post('/recipes', validateJWT, Recipe.create);
app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.findById);
app.put('/recipes/:id', validateJWT, Recipe.edit);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), Recipe.addImage);
app.delete('/recipes/:id', validateJWT, Recipe.deleteOne);

module.exports = app;
