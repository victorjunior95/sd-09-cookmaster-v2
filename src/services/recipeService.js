const { ObjectId } = require('mongodb');
const errors = require('../utils/errors');
const recipeModel = require('../models/recipeModels');

const postRecipeService = async (data) => {
 const { body } = data;
 if (!body.name || !body.ingredients || !body.preparation) return errors.emptyValuesErr;

 return { response: await recipeModel.postRecipeModel(data), status: 201 };
};

const getAllRecipeService = async () => {
  const request = await recipeModel.getAllRecipeModel();
  return { response: request, status: 200 };
};

const getRecipeByIdService = async (id) => {
  if (!ObjectId.isValid(id)) return errors.notFoundErr;

  const request = await recipeModel.getRecipeByIdModel(ObjectId(id));

  if (!request) return errors.notFoundErr;

  return { response: request, status: 200 };
};

const editRecipeService = async (id, data, user) => {
  const { _id } = user;

  if (!ObjectId.isValid(id)) return errors.notFoundErr;
  const newData = { userId: _id, ...data };
  
  const request = await recipeModel.editRecipeModel(id, newData);
  if (!request) return errors.notFoundErr;
  return { response: request, status: 200 };
};

const deleteRecipeService = async (id) => {
  const findRecipe = await recipeModel.getRecipeByIdModel(id);
  if (!findRecipe) return errors.notFoundErr;

  const request = await recipeModel.deleteRecipeModel(id);

  return { response: request, status: 204 };
};

const uploadPictureService = async (id, user) => {
  const { _id } = user;
  // console.log(user);
  const findRecipe = await recipeModel.getRecipeByIdModel(id);
  if (!findRecipe) return errors.notFoundErr;
  if (String(findRecipe.userId) === String(_id) || user.role === 'admin') {
    const request = await recipeModel.uploadPictureModel(id);
    // console.log(typeof findRecipe.userId, typeof _id);
    return { response: request, status: 200 };
  }
  if (String(findRecipe.userId) !== String(id)) return errors.wrongUser;
};

module.exports = {
  postRecipeService,
  getAllRecipeService,
  getRecipeByIdService,
  editRecipeService,
  deleteRecipeService,
  uploadPictureService,
};