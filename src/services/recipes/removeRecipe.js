const { findRecipe, removeRecipe } = require('../../models/recipes');
const validToUpdate = require('../utils/validToUpdate');

const delRecipe = async (id, user) => {
  const recipe = await findRecipe(id);

  const valid = validToUpdate(recipe[0], user);
  
  if (!valid) {
    return { error: true, code: 'STATUS_FORBIDDEN', message: 'userForbidden' };
  }

  try {
    await removeRecipe(id);
    return { error: false, code: 'STATUS_NO_CONTENT', message: null };
  } catch (error) {
    return { error: true, code: 'STATUS_INTERNAL_ERROR', message: error };
  }
};

module.exports = delRecipe;