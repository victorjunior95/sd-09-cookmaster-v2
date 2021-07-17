const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();

const recipesServices = require('../services/recipesService');

const { validateRecipe } = require('../schemas/recipesSchema');
const { validateJWT } = require('../auth/validateJWT');
const StatusCode = require('../schemas/StatusCode.js');

/* --------------- multer and storage to upload files --------------- */
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
  path: (req, file, callback) => {
    callback(null, );
  }
});
const uploads = multer({ storage });

/* --------------- multer and storage to upload files --------------- */

router.get('/', rescue(async(_req, res) => {
  const recipes = await recipesServices.getAllRecipes();

  if (!recipes) return res.status(StatusCode.NOT_FOUND).json({ 
    message: 'recipes not found' 
  });

  res.status(StatusCode.OK).json(recipes);
}));

router.get('/:id', rescue(async(req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getRecipeById(id);

  if (!recipe) return res.status(StatusCode.NOT_FOUND).json({ 
    message: 'recipe not found' 
  });

  res.status(StatusCode.OK).json(recipe);
}));

router.post('/', validateRecipe, validateJWT, rescue(async(req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req._id;
  const createdNewRecipe = await recipesServices
    .createRecipe(name, ingredients, preparation, userId);

  res.status(StatusCode.CREATED).json(createdNewRecipe);
}));

router.put('/:id', validateJWT, rescue(async(req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const user = req.user;
  const userId = user._id;

  const updatedRecipe = await recipesServices
    .updateRecipeById(id, recipe, userId);

  res.status(StatusCode.OK).json(updatedRecipe);
}));

router.delete('/:id', validateJWT, rescue(async(req, res) => {
  const { id } = req.params;
  const user = req.user;

  await recipesServices.deleteRecipeById(id, user);

  res.status(StatusCode.NO_CONTENT).json({ message: 'success '});
}));

router.put('/:id/image', validateJWT, uploads.single('image'), rescue(async(req, res) => {
  const { path } = req.file;
  const { id } = req.params;
  const { host } = req.headers;

  const image = `${host}/${path}`;
  await recipesServices.uploadRecipeImage(id, image);

  const recipe = await recipesServices.getRecipeById(id);

  res.status(StatusCode.OK).json(recipe);
}));

module.exports = router;
