const error = {
  invalid: 'Invalid entries. Try again.',
 
};

const status = {
  badRequest: 400,
  unauthorizes: 401,
};

const nameIsValid = async (name) => {
  if (!name) return false;
  return true;
};

const ingredientsIsValid = async (ingredients) => {
  if (!ingredients) return false;
  return true;
};

const preparationIsValid = async (preparation) => {
  if (!preparation) return false;
  return true;
};

const validateRecipe = async (name, ingredients, preparation) => {
  const validName = await nameIsValid(name);
  const validIngredients = await ingredientsIsValid(ingredients);
  const validPreparation = await preparationIsValid(preparation);

  if (!validName || !validIngredients || !validPreparation) {
    return { isError: true,
      message: error.invalid,
      status: status.badRequest,
    };
  }

  return true;
};

module.exports = {
  validateRecipe,
};