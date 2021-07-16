const Joi = require('joi');
const { Recipe } = require('../models');
const { InvalidArgumentError } = require('../errors');

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
};