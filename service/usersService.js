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
  const newUser = await userModel.userRegisterModel(userData);
  const { name, email, role, _id } = newUser.ops[0];
  const userWithouPass = {
    user: {
      name,
      email,
      role,
      _id,
    },
  };
  return userWithouPass;
};

const loginService = async (userData) => {
  const { email, password, id, role } = userData;
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
  return tokenService.generateToken(email, id, role);
};

const createRecipeService = async (bodyObject) => {
  const { name, ingredients, preparation } = bodyObject;
  const result = await userModel.createRecipeModel(
    name,
    ingredients,
    preparation,
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

module.exports = {
  userRegisterService,
  loginService,
  createRecipeService,
  allRecipesService,
  getOneRecipeService,
};
