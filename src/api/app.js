const app = require('express')();
const bodyParser = require('body-parser').json();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser);

module.exports = app;
