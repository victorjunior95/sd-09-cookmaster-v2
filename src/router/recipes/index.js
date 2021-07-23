const express = require('express');
const multer = require('multer');
const validateJWT = require('../../api/auth/validateJWT');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const idImage = req.params;
    callback(null, `${idImage.id}.jpeg`);
  } });

const upload = multer({ storage });

const { createRecipe,
  getAllRecipes,
  getById,
  updateRecipes,
  updateImageRecipes,
  deleteRecipes,
} = require('../../controllers/recipes');

const recipeRouter = express.Router();

recipeRouter.post('/', validateJWT, createRecipe);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getById);
recipeRouter.put('/:id', validateJWT, updateRecipes);
recipeRouter.put('/:id/image', validateJWT, upload.single('image'), updateImageRecipes);
recipeRouter.delete('/:id', validateJWT, deleteRecipes);

module.exports = recipeRouter;