const Joi = require('joi');
const recipeModel = require('../model/recipes');

const commonError = 'Invalid entries. Try again.';
const RecipesShema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': commonError,
    'any.required': commonError,
  }),
  ingredients: Joi.string().required().messages({
    'string.base': commonError,
    'any.required': commonError,
  }),
  preparation: Joi.string().required().messages({
    'string.base': commonError,
    'any.required': commonError,
  }),
});

const validateError = (status, message) => ({ status, message });

const createRecipe = async (recipe) => {
  const { error } = RecipesShema.validate(recipe);

  if (error) {
    throw validateError(400, error.message);
  }

  const newRecipe = await recipeModel.createRecipe(recipe);
  return newRecipe;
};

const listRecipes = async () => {
  const list = await recipeModel.listAllRecipes();
  return list;
};

const findById = async (id) => {
  const recipe = await recipeModel.findById(id);
  return recipe;
};

const updateRecipes = (id, recipes) => {
  const { error } = RecipesShema.validate(recipes);
  if (error) {
    throw validateError(401, error.message);
  }
};

/*
const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('products').updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name: name,
          quantity: quantity
        },
      },
    ));
};
// 4 - Crie um endpoint para deletar um produto
const deleteProduct = async (id) => {
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: new ObjectId(id) }))
    .catch((err) => {
      console.log(err);
      return err;
    });
};
*/

const deleteRecipe = (id) => id;

module.exports = {
  createRecipe,
  listRecipes,
  findById,
  updateRecipes,
  deleteRecipe,
};