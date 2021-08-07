const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');
const path = require('path');
const router = require('../router');
const middlewares = require('../middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

/*
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads'),
});

const upload = multer({
  storage,
});
*/

app.use(middlewares.error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
