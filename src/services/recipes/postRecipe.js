const { addRecipe } = require('../../models/recipes');
const { fieldsNExist } = require('./utils');

const setRecipe = async (name, ingredients, preparation, user) => {
  const fields = fieldsNExist(name, ingredients, preparation);

  if (fields) {
    return fields;
  }

  const { _id: userId } = user;

  const recipe = { name, ingredients, preparation, userId };

  const newRecipe = await addRecipe(recipe);

  return { error: false, code: 'STATUS_CREATED', message: newRecipe };
};

module.exports = setRecipe;
