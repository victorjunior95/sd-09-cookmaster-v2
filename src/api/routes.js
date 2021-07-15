const express = require('express');
const validateNewUser = require('../middlewares/validateNewUser');
const validateLoginInput = require('../middlewares/validateLoginInput');

// import de controllers
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');

// Rotas de /user
const usersRouter = express.Router();

usersRouter.post('/', validateNewUser, usersController.postNewUser);

// Rotas de /login
const loginRouter = express.Router();

loginRouter.post('/', validateLoginInput, loginController.postLogin);

// Rotas de /recipe
const recipeRouter = express.Router();
recipeRouter.post('/', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes post',
  });
});

recipeRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes get',
  });
});

recipeRouter.get('/:id', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes/:id get',
  });
});

recipeRouter.put('/:id', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes/:id put',
  });
});

recipeRouter.delete('/:id', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes/:id delete',
  });
});

module.exports = {
  usersRouter,
  recipeRouter,
  loginRouter,
};