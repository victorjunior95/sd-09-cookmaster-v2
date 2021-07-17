const jwt = require('jsonwebtoken');

const { findUserByEmail } = require('../models/userModel');
const {
  invalidEntriesError,
  emailRegisteredError,
  allFieldsError,
  incorrectEmailOrPassword,
  notAllowed,
} = require('./errorsMessages');

const secret = 'undefined';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const validateEmail = (email) => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);

const emailExists = async (email) => {
  const emailRegistered = await findUserByEmail(email);
  if (emailRegistered) throw emailRegisteredError;
};

const validateNewUser = async (newUser) => {
  const { name, email, password } = newUser;
  
  if (!name || !password || !validateEmail(email)) throw invalidEntriesError;

  await emailExists(email);
};

const validateLogin = async (user) => {
  const { email, password } = user;

  if (!email || !password) throw allFieldsError;

  const userFound = await findUserByEmail(email);
  if (!userFound || password !== userFound.password) throw incorrectEmailOrPassword;

  const { password: pass, ...userWithoutPassword } = userFound;
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  
  return { token };
};

const validateRecipe = (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) throw invalidEntriesError;
};

const validateRecipeOwnerOrAdmin = async (user, recipeToEdit) => {
  const { _id: id, role } = user;
  if (id !== recipeToEdit.userId && role !== 'admin') throw notAllowed;
};

module.exports = {
  validateNewUser,
  validateLogin,
  validateRecipe,
  validateRecipeOwnerOrAdmin,
};
