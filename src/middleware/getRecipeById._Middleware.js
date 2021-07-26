const { ObjectId } = require('mongodb');
const { findRecipeByID } = require('../models');
const { RECIPE_NOT_FOUND } = require('../Messages/errors');

const getRecipeById = async (req, res) => {
  const { code, message } = RECIPE_NOT_FOUND;
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(code).json({ message });
  }

  const result = await findRecipeByID(id);
  if (!result) {
    return res.status(code).json({ message });
  }
  res.status(200).json(result);
};

module.exports = getRecipeById;
