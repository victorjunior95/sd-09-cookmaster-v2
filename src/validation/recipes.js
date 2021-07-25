const joi = require('joi');

const create = joi.object({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
});

module.exports = {
  create,
};