const path = require('path');
const fs = require('fs').promises;

const recipesModel = require('../models/recipesModel');
const { validateError, schema } = require('./schemas/recipesSchema');

const createRecipe = async (recipe) => {
  const { userId: _, ...recipeData } = recipe;

  const { error } = schema.validate(recipeData);

  if (error) throw validateError(400, error.message);

  const result = await recipesModel.createRecipe(recipe);

  return { result, status: 201 };
};

const findAll = async () => {
  const result = await recipesModel.getAll();

  return { result, status: 200 };
};

const findById = async (id) => {
  const result = await recipesModel.getById(id);

  if (!result) {
    return { status: 404, message: 'recipe not found' };
  }

  return { status: 200, result };
};

const update = async (recipeId, recipe, user) => {
  const { role, _id: id } = user;
  const { userId } = await recipesModel.getById(recipeId);

  if (role === 'user' && id !== userId) throw validateError(401, 'unauthorized');

  await recipesModel.update(recipeId, recipe);

  const result = { _id: recipeId, ...recipe, userId };

  return { status: 200, result };
};

const deleteRecipe = async (recipeId, user) => {
  const { role, _id: id } = user;

  const result = await recipesModel.getById(recipeId);

   if (role === 'user' && id !== result.userId) throw validateError(401, 'unauthorized');

  await recipesModel.deleteRecipe(recipeId);

  return { status: 204 };
};

const addImageToRecipe = async (recipeId, user, fileData) => {
  const { role, _id: id } = user;
  const { buffer, ...file } = fileData;
  const img = `${recipeId}.jpeg`;
  const uploadsFolder = path.join(__dirname, '..', 'uploads', img);
  const imgPath = `localhost:3000/src/uploads/${recipeId}.jpeg`;
  // const imgUrl = `${file.destination}/${img}`;

  const recipe = await recipesModel.getById(recipeId);
  const { userId } = recipe;

  if (role === 'user' && id !== userId) throw validateError(401, 'unauthorized');

  await fs.writeFile(uploadsFolder, buffer);

  // await recipesModel.update(recipeId, imgUrl);

  return {
    status: 200,
    result: {
      ...recipe,
      image: imgPath,
    },
  };
};

module.exports = {
  createRecipe,
  findAll,
  findById,
  update,
  deleteRecipe,
  addImageToRecipe,
};
