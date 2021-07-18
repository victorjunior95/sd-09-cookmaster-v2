const verifyNameIngredientsPreparationExistence = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    const objectError = {
      code: 400,
      message: 'Invalid entries. Try again.',
    };
    throw objectError;
  }
};

const recipeValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    verifyNameIngredientsPreparationExistence(name, ingredients, preparation);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = recipeValidation;
