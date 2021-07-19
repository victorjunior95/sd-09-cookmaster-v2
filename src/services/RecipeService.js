const multer = require('multer');
const path = require('path');
const RecipeModel = require('../models/RecipesModel');
const UsersModel = require('../models/UsersModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await RecipeModel.createRecipe(name, ingredients, preparation, userId);
  return newRecipe.ops[0];
};

const findUserByEmail = async (email) => {
  const user = await UsersModel.findUserByEmail(email);
  return user;
};

const getRecipes = async () => {
  const recipes = RecipeModel.getRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await RecipeModel.getRecipeByid(id);
  return recipe;
};

const updateRecipe = async (id, body, userId) => {
  const recipe = await RecipeModel.updateRecipe(id, body, userId);
  return recipe;
};

const deleteRecipe = async (id) => {
  const deleted = await RecipeModel.deleteRecipe(id);
  return deleted;
};

const isertUrlImage = async (id, url) => {
  await RecipeModel.insertUrlImage(id, url);
  const recipe = RecipeModel.getRecipeByid(id);
  return recipe;
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads/'),
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg') {
    req.fileValidationError = true;
    return cb(null, false);
  }
  return cb(null, true);
};

const uploadPicture = multer({ fileFilter, storage });

module.exports = {
  createRecipe,
  findUserByEmail,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  isertUrlImage,
  uploadPicture,
};