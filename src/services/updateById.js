const { findRecipeByID, updateRecipeById } = require('../models');

const updateById = async (id, _id, role, recipe) => {
  const recipeUpdated = {
    userId: _id,
    ...recipe,
    role,
  };

  if (role === 'admin') await updateRecipeById(id, recipeUpdated);

  const find = await findRecipeByID(id);

  if ((find.userId).toString() === (_id).toString()) await updateRecipeById(id, recipeUpdated);
  if ((find.userId).toString() !== (_id).toString()) return false;

  const result = {
    _id: id,
    ...recipeUpdated,
  };

  return result;
};

module.exports = updateById;
