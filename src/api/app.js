const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');
const error = require('../middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use(routes);
app.use('/images', express.static('src/uploads/'));
app.use(error);

module.exports = app;
