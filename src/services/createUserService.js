const Joi = require('joi');
const { 
  createToken,
  joiError,
} = require('../utils/createToke');
const {
  allFields,
  invalidEntries,
  emailAlreadyExists,
  recipeNotFound,
  missingAuthToken,
} = require('../dictionaryError');
const {
  createUserModel,
  findByemail,
  createRecipeModel,
  listAllRecipesModel,
  listRecipeById,
  updateRecipe,
  deleteRecipe,
  addURLimage,
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
  if (exixtEmail) return joiError(emailAlreadyExists());
  
  const { value, error } = createUserSchema.validate({ name, email, password, role });
  if (error) return joiError(invalidEntries());
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

const listAllRecipesService = async () => {
  const allrecipes = await listAllRecipesModel();
  return allrecipes;
};

const listRecipeByIdService = async (id) => {
  const recipe = await listRecipeById(id);
  if (!recipe) return joiError(recipeNotFound());
  return recipe;
};

const canChangeRecipe = (role, userID, recipe) => {
  if (role === 'admin') return true;
  if (JSON.stringify(recipe.userId) === JSON.stringify(userID)) return true;
  return false;
};

const updateRecipeService = async (recipeData, userId, role) => {
  const { ingredients, name, preparation, recipeId } = recipeData;
  const oldRecipe = await listRecipeById(recipeId);

  if (!canChangeRecipe(role, userId, oldRecipe)) return joiError(missingAuthToken());
  
  await updateRecipe(name, ingredients, preparation, recipeId);
  const updatedRecipe = await listRecipeById(recipeId);
  
  return updatedRecipe;
};

const deleteRecipeService = async (recipeId, userId, role) => {
  const oldRecipe = await listRecipeById(recipeId);
  
  if (!canChangeRecipe(role, userId, oldRecipe)) return joiError(missingAuthToken());
  
  await deleteRecipe(recipeId);
  return oldRecipe;
};

const addURLimageService = async (recipeId, path, role, userId) => {
  const oldRecipe = await listRecipeById(recipeId);

  if (!canChangeRecipe(role, userId, oldRecipe)) return joiError(missingAuthToken());

  const urlImage = `localhost:3000/${path}`;
  await addURLimage(recipeId, urlImage);
  const recipeUpdated = await listRecipeById(recipeId);
  return recipeUpdated;
};

module.exports = {
    createUserService,
    validLoginService,
    createRecipeService,
    listAllRecipesService,
    listRecipeByIdService,
    updateRecipeService,
    deleteRecipeService,
    addURLimageService,
};