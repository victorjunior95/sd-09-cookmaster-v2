const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');

const secret = 'segredao';

module.exports = {
  validateToken: async (token) => {
    if (!token) {
      return {
        status: 401,
        message: 'missing auth token',
      };
    }

    try {
      const payload = jwt.verify(token, secret);

      const { password: _, ...withoutPassword } = payload;

       return withoutPassword;
    } catch (err) {
      return {
        status: 401,
        message: err.message,
      };
    }
  },

  addRecipe: async (name, ingredients, preparation, id) => {
    if (!name || !ingredients || !preparation) {
      return {
        status: 400,
        message: 'Invalid entries. Try again.',
      };
    }

    return recipesModel.addRecipe(name, ingredients, preparation, id);
  },

  listAllRecipes: async () => {
    const listAllRecipes = await recipesModel.listAllRecipes();

    return listAllRecipes;
  },

  listOneRecipe: async (id) => {
    const listOneRecipe = await recipesModel.listOneRecipe(id);

    if (!listOneRecipe) {
      return {
        status: 404,
        message: 'recipe not found',
      };
    }

    return listOneRecipe;
  },
};
