const express = require('express');
const bodyParser = require('body-parser');
const ERROR_MIDDLEWARE = require('./middlewares/ErrorMiddleware');
// const JWT_VALIDATOR = require('./middlewares/JWTValidator');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.post('/users', controllers.userController);
app.post('/login', () => { console.log('controler'); });
app.post('/recipes', () => { console.log('posta receita'); });
app.get('/recipes', () => { console.log('lista com e sem jwt'); });
app.get('/recipes/:id', () => { console.log('lista com e sem jwt'); });
app.post('/recipes/:id', () => { console.log('postar IMG'); });
app.put('/recipes/:id', () => { console.log('edita só com auth'); });
app.delete('/recipes/:id', () => { console.log('edita só com auth'); });
app.get('/imagens/:id', () => { console.log('ver IMG'); });
app.post('/users/admin', () => { console.log('controler'); });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(ERROR_MIDDLEWARE);

module.exports = app;
