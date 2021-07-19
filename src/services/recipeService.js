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
  const findUser = await recipeModel.getRecipeByIdModel(id);
  if (!findUser) return errors.notFoundErr;
  if (findUser.email !== user.email || user.role === 'admin') {
    const request = await recipeModel.uploadPictureModel(id);
    return { response: request, status: 200 };
  }
  // console.log({ isTrue: findUser.email !== user.email });
  // if (findUser.email !== user.email) return errors.wrongUser;
};

module.exports = {
  postRecipeService,
  getAllRecipeService,
  getRecipeByIdService,
  editRecipeService,
  deleteRecipeService,
  uploadPictureService,
};