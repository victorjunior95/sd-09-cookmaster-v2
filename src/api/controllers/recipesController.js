const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipeModel');
const usersModel = require('../models/usersModel');

const invalidEntriesStatus = 400;
const invalidTokenStatus = 401;
const failRecipeStatus = 404;
const sucessAllRecipesStatus = 200;
const sucessStatus = 201;
const sucessDeleteStatus = 204;

const malformedJWT = 'jwt malformed';

const uploadsPath = path.resolve(__dirname.replace('/api/controllers', '/uploads'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadsPath);
  },
  filename: (req, file, callback) => {
    console.log(req.params.id);
    callback(null, req.params.id + '.jpeg');
  },
});

const upload = multer({ storage });

router.put('/:id/image', (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(invalidTokenStatus).send({ message: 'missing auth token' });
  }
  
  next();
}, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const imageName = `localhost:3000/src/uploads/${id}.jpeg`;

  await recipesModel.updateImageRecipe(id, imageName);
  const recipe = await recipesModel.getById(id);
  console.log('edit recipe', recipe);
  res.status(sucessAllRecipesStatus).send(recipe);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(invalidTokenStatus).send({ message: 'missing auth token' });
  }

  const authorizatedToken = await recipesService.authToken(token);

  if (authorizatedToken === 'err') {
    return res.status(invalidTokenStatus).send({ message: malformedJWT });
  }

  await recipesModel.deleteById(id);
  res.status(sucessDeleteStatus).send();
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const body = req.body;

  if (!token) {
    return res.status(invalidTokenStatus).send({ message: 'missing auth token' });
  }

  const authorizatedToken = await recipesService.authToken(token);

  if (authorizatedToken === 'err') {
    return res.status(invalidTokenStatus).send({ message: malformedJWT });
  }

  await recipesModel.updateRecipe(id, body);
  const updatedRecipe = await recipesModel.getById(id);
  
  res.status(sucessAllRecipesStatus).send(updatedRecipe);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const recipeById = await recipesModel.getById(id);

  if (token) {
    const authorizatedToken = await recipesService.authToken(token);
    if (!token || authorizatedToken === 'err') {
      return res.status(invalidTokenStatus).send({ message: malformedJWT });
    }
  }

  if (recipeById) {
    return res.status(sucessAllRecipesStatus).json(recipeById);
  };

  return res.status(failRecipeStatus).json({ 
    message: 'recipe not found'
  });
});

router.get('/', async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    const authorizatedToken = await recipesService.authToken(token);
    if (!token || authorizatedToken === 'err') {
      return res.status(invalidTokenStatus).send({ message: malformedJWT });
    }
  }

  const allRecipes = await recipesModel.getAll();
  res.status(sucessAllRecipesStatus).send(allRecipes);
});

router.post('/', async (req, res) => {
  const token = req.headers.authorization;
  const body = req.body;

  const authorizatedToken = await recipesService.authToken(token);

  if (!token || authorizatedToken === 'err') {
    return res.status(invalidTokenStatus).send({ message: malformedJWT });
  }

  const recipeValidated = await recipesService.recipeValidation(body);
  if (recipeValidated.isJoi) {
    return res.status(invalidEntriesStatus)
      .send({ message: 'Invalid entries. Try again.' });
  }

  const userInformations = await usersModel.getByName(authorizatedToken.data.name);
  const createdRecipe = await recipesService.createRecipe(body, userInformations);
  res.status(sucessStatus).send(createdRecipe);
});

module.exports = router;
