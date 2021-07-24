const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../../middlewares/authMiddleware');
const { 
  postRecipe,
  getRecipes,
  getOneRecipe,
  putRecipe,
  deleteRecipe,
  postImage,
} = require('./recipesMiddlewares');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipes = express.Router();

recipes.get('/', getRecipes);

recipes.get('/:id', getOneRecipe);

recipes.use(authMiddleware);

recipes.post('/', postRecipe);

recipes.put('/:id/image', upload.single('image'), postImage);

recipes.put('/:id', putRecipe);

recipes.delete('/:id', deleteRecipe);

module.exports = recipes;