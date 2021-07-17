const fields = (recipe) => {
  if (!recipe.name || !recipe.ingredients || !recipe.preparation) {
    const err = { status: 400, message: 'Invalid entries. Try again.' };
    throw err;
  }
  return null;
};

module.exports = {
  fields,
};
