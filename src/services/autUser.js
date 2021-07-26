const { findRecipeByID, insertImageById } = require('../models');

const autUser = async (id, _id, role, image) => {
  const recipe = await findRecipeByID(id);
  console.log(recipe);
  const { userId } = recipe;
  const recipeUpdated = {
    userId,
    name: recipe.name,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
    image,
  };
  // console.log(recipeUpdated);
  if (role === 'admin') {
    await insertImageById(id, recipeUpdated);
    return { _id: id, ...recipeUpdated };
  } 
  if ((recipe.userId).toString() === (_id).toString()) await insertImageById(id, recipeUpdated);
  if ((recipe.userId).toString() !== (_id).toString()) return false;
  return { _id: id, ...recipeUpdated };
};

module.exports = autUser;
