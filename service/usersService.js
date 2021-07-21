// const { error } = require('shelljs');
const userModel = require('../models/usersModel');
const tokenService = require('./token');

const validateDataRegister = (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    const erro = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
    throw erro;
  }
};

const emailValidator = async (email) => {
  const regex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!regex) {
    const erro = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
    throw erro;
  }
  const emailExists = await userModel.findEmail(email);
  if (emailExists !== null) {
    const erro = {
      status: 409,
      message: 'Email already registered',
    };
    throw erro;
  }
};

const userRegisterService = async (userData) => {
  validateDataRegister(userData);
  await emailValidator(userData.email);
  const newUser = { ...userData, role: 'user' };
  const result = await userModel.userRegisterModel(newUser);
  return result;
};

const loginService = async (userData) => {
  const { email, password } = userData;
  const { _id, role } = await userModel.findEmail(email);
  if (!email || !password) {
    const erro = {
      status: 401,
      message: 'All fields must be filled',
    };
    throw erro;
  }
  const result = await userModel.validadeLogin(email, password);
  if (!result) {
    const erro = {
      status: 401,
      message: 'Incorrect username or password',
    };
    throw erro;
  }
  return tokenService.generateToken(email, _id, role);
};

const createRecipeService = async (bodyObject, userId) => {
  const { name, ingredients, preparation } = bodyObject;
  const result = await userModel.createRecipeModel(
    name,
    ingredients,
    preparation,
    userId,
  );
  if (!name || !ingredients || !preparation) {
    const erro = {
      message: 'Invalid entries. Try again.',
      status: 400,
    };
    throw erro;
  }
  return result;
};

const allRecipesService = async () => {
  const result = await userModel.getAllRecipes();
  return result;
};

const getOneRecipeService = async (id) => {
  const result = await userModel.getOneRecipe(id);
  // if (!result) {
  //   const erro = {
  //     message: 'recipe not found',
  //     status: 404,
  //   };
  //   throw erro;
  // }
  return result;
};

const editOneRecipeService = async (id, recipeObject, userId) => {
  const result = await userModel.editOneRecipe(id, recipeObject, userId);
  return result;
};

const delOneRecipeService = async (id) => {
  const result = await userModel.deleteOneRecipe(id);
  return result;
};

module.exports = {
  userRegisterService,
  loginService,
  createRecipeService,
  allRecipesService,
  getOneRecipeService,
  editOneRecipeService,
  delOneRecipeService,
};
