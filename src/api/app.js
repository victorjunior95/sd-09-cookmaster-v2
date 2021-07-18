const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../Controllers/userController')
const app = express();
app.get('/', (request, response) => {
  response.send('aaa');
});

app.use(bodyParser.json());
app.get('/users', userController.login )



module.exports = app;
