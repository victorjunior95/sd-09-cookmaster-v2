const multer = require('multer');
const path = require('path');
const recipesServices = require('../services/recipes');

const ERROR = 500;
const OK = 200;
const NO_CONTENT = 204;
const CREATE = 201;
const DIR_PATH = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, callBack) => {
    callBack(null, DIR_PATH);
  },
  filename: (req, _file, callBack) => {
    const { id } = req.params;
    callBack(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    // console.log(token);
    const { message } = await recipesServices.createRecipes(
      name,
      ingredients,
      preparation,
      token,
    );
    return res.status(CREATE).json(message);
  } catch (error) {
    res.status(ERROR).json(error);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesServices.getAll();
    return res.status(OK).json(recipes);
  } catch (error) {
    res.status(ERROR).json(error);
  }
};

const getRecipesById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeId = await recipesServices.recipesById(id);
    return res.status(OK).json(recipeId);
  } catch (error) {
    res.status(ERROR).json(error);
  }
};

const updateRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updatedRecipe = await recipesServices.updateRecipeById(
      id,
      name,
      ingredients,
      preparation,
    );
    // console.log(updatedRecipe.value);
    return res.status(OK).json(updatedRecipe.value);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const deleteRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await recipesServices.deleteRecipes(id);
    return res.status(NO_CONTENT).json(deleteRecipe);
  } catch (error) {
    res.status(ERROR).json(error);
  }
};

const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    upload(req, res, async (err) => {
      if (err) {
        return res.status(ERROR).json({ message: err });
      }
      const { filename } = req.file;
      const newImage = await recipesServices.updateImage(id, filename);
      return res.status(OK).json(newImage);
    });
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipes,
  deleteRecipes,
  addImage,
};
