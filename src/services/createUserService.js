const Joi = require('joi');
const { 
  createToken,
  joiError,
} = require('../utils/createToke');
const { allFields, invalidEntries } = require('../dictionaryError');
const {
  createUserModel,
  findByemail,
  createRecipeModel,
} = require('../models/createUserModel');

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
    role: Joi.string().default('user'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createUserService = async ({ name, email, password, role }) => {
  const exixtEmail = await findByemail(email);
  if (exixtEmail) return joiError({ message: 'Email already registered', status: 409 });
  
  const { value, error } = createUserSchema.validate({ name, email, password, role });
  if (error) return joiError({ message: 'Invalid entries. Try again.', status: 400 });
  const userCreated = await createUserModel(value);

  return userCreated;
};

const validLoginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) return joiError(allFields());
  
  const user = await findByemail(email);
  if (!user || user.password !== password) {
   (joiError({
      message: 'Incorrect username or password',
      status: 401,
    })); 
  }

  const { password: _, ...userWithoutPassword } = user;

  const token = createToken(userWithoutPassword);
  return token;
};

const createRecipeService = async ({ name, ingredients, preparation, userData }) => {
  const { _id } = userData;
  const userId = _id;

  const { error } = recipeSchema.validate({ name, preparation, ingredients });
  if (error) return joiError(invalidEntries());

  const recipeCreated = await createRecipeModel({ name, ingredients, preparation, userId });
  return recipeCreated;
};

module.exports = {
    createUserService,
    validLoginService,
    createRecipeService,
};