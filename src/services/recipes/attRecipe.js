const { updateRecipe, findRecipe } = require('../../models/recipes');
const validToUpdate = require('../utils/validToUpdate');
const { fieldsNExist } = require('./utils');

const attRecipe = async (id, { name, ingredients, preparation }, user) => {
  const fields = fieldsNExist(name, ingredients, preparation);

  if (fields) {
    return fields;
  }

  const recipe = await findRecipe(id);

  const valid = validToUpdate(recipe[0], user);
  
  if (!valid) {
    return { error: true, code: 'STATUS_FORBIDDEN', message: 'userForbidden' };
  }

  const { _id: userId } = user;

  const newRecipe = { name, ingredients, preparation, userId };

  const result = await updateRecipe(id, newRecipe);

  return { error: false, code: 'STATUS_OK', message: result };
};

module.exports = attRecipe;
