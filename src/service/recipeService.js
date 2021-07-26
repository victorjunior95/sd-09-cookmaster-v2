const fs = require('fs').promises;
const { StatusCodes } = require('http-status-codes');

const recipeModel = require('../model/recipeModel');

const createRecipes = async (recipes) => {
  const { name, ingredients, preparation, userId } = recipes;

  if (!name || !ingredients || !preparation) {
     return {
       isError: true,
       status: StatusCodes.BAD_REQUEST,
       err: { message: 'Invalid entries. Try again.' },
       };
    }
  const result = await recipeModel
    .createRecipes({ name, ingredients, preparation, userId });
   return result;
};
 const getRecipes = async () => {
  const result = await recipeModel.getRecipes();
  return result;
};

 const findRecipes = async (recipeId) => {
  const result = await recipeModel.findRecipes(recipeId);
  if (!result || result.error) {
  return {
    isError: true,
    status: StatusCodes.NOT_FOUND,
    err: { message: 'recipe not found' },
    };
}
  return result;
};

const updateRecipes = async (id, name, ingredients, preparation) => {
  const result = await recipeModel.updateRecipes(id, name, ingredients, preparation);
  return result;
};

const deleteRecipes = async (recipeId) => {
  const result = await recipeModel.deleteRecipes(recipeId);
  return result;
};

const imageUpdate = async (recipeId, file) => {
  const image = `localhost:3000/${file.destination}${file.filename}`;
  recipeModel.imageUpdate(recipeId, image);
  const result = await recipeModel.findRecipes(recipeId);
  return result;
};

const getImage = async (recipeId) => {
  const { image } = await recipeModel.findRecipes(recipeId);
  const array = image.split('3000/');
  const filename = array[array.length - 1];
  const localImage = await fs.readFile(filename, 'utf8');
  return localImage;
};

module.exports = {
  createRecipes,
  getRecipes,
  findRecipes,
  updateRecipes,
  deleteRecipes,
  imageUpdate,
  getImage,
};
