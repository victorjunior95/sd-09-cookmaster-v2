const validateExists = async (recipeById) => {
  if (recipeById === null) {
    return {
      message: 'recipe not found',
    };
  }
};

module.exports = validateExists;
