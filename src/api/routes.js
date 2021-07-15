const express = require('express');
const validateNewUser = require('../middlewares/validateNewUser');

// import de controllers
const usersControllers = require('../controllers/usersController');

// Rotas de /user
const usersRouter = express.Router();

usersRouter.post('/', validateNewUser, usersControllers.postNewUser);

// Rotas de /login
const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  res.status(200).json({
    message: 'estamos no /login post',
  });
});

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