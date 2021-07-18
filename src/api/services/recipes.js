const Joi = require('joi');
const { Recipe } = require('../models');
const { InvalidArgumentError, NotFoundError } = require('../errors');

const RecipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

module.exports = {
  async create(payload, userId) {
    const { error } = RecipeSchema.validate(payload);

    if (error) throw new InvalidArgumentError('Invalid entries. Try again.');

    const recipe = new Recipe(payload);
    const response = await recipe.create(userId);

    return { recipe: response };
  },
  async getAll() {
    const recipe = new Recipe({});
    const response = await recipe.getAll();

    return response;
  },
  async getById(id) {
    const recipe = new Recipe({ id });
    const response = await recipe.getById();

    if (!response || !Object.keys(response).length) {
      throw new NotFoundError('recipe');
    }

    return response;
  },
};