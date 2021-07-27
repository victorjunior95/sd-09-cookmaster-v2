const express = require('express');
const multer = require('multer');
const path = require('path');
const { validateToken, verifyToken } = require('../middlewares/auth');
const recipesService = require('../services/recipesService');
const { validateRecipe, validateRecipeId } = require('../middlewares/validateRecipe');

const router = express.Router();

const responseCodes = {
  success: 200,
  created: 201,
  noContent: 204,
  notFound: 404,
  notAuthorized: 401,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const uploadDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, _res, callback) => {
    const fileName = `${req.params.id}.jpeg`;
    callback(null, fileName);
  },
});

router.get('/', async (req, res) => {
    const token = req.headers.authorization;
    if (token) verifyToken(token);
    const recipes = await recipesService.getAllRecipes();
    res.status(responseCodes.success).json(recipes);
  });

router.get('/:id', validateRecipeId, async (req, res) => {
  const token = req.headers.authorization;
  if (token) verifyToken(token);
  const { id } = req.params;
  const recipe = await recipesService.findRecipeById(id);
  res.status(responseCodes.success).json(recipe);
});

router.post('/', validateToken, validateRecipe, async (req, res) => {
  const reqRecipe = req.body;
  const { _id } = req.user;
  reqRecipe.userId = _id;
  const recipe = await recipesService.addRecipe(reqRecipe);
  res.status(responseCodes.created).json(recipe);
});

const upload = multer({ storage });

router.put('/:id', validateToken, async (req, res) => {
  const reqRecipe = req.body;
  const { id } = req.params;
  const reqUser = req.user;
  const changedRecipe = await recipesService.updateRecipe(reqRecipe, id, reqUser);
  res.status(responseCodes.success).json(changedRecipe);
});

router.put('/:id/image', validateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const reqUser = req.user;
    const imgUrl = `localhost:3000/src/uploads/${req.file.filename}`;
    const recipe = await recipesService.findRecipeById(id);
    recipe.image = imgUrl;
    const changedRecipe = await recipesService.updateRecipe(recipe, id, reqUser);
    res.status(responseCodes.success).json(changedRecipe);
  } catch (error) {
    res.status(responseCodes.notAuthorized).json({ message: error.message });
  }
});

router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    await recipesService.removeRecipe(id, user);
    res.status(responseCodes.noContent).send();
});

module.exports = router;
