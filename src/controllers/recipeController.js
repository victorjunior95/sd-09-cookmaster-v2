const { recipe } = require('../services');

// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
// const HTTP_UNAUTHORIZED_STATUS = 401;

const ENTRIES_ERROR = 'Invalid entries. Try again.';
// const LOGIN_FIELD_ERROR = 'All fields must be filled';

const addRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId, email, role } = req.user;

  if (!name || !ingredients || !preparation) {
    const err = new Error(ENTRIES_ERROR);

    err.statusCode = HTTP_BAD_REQUEST_STATUS;

    return next(err);
  }

  const newRecipe = await recipe.addRecipe(
    { name, ingredients, preparation },
    { userId, email, role },
  );

  if (newRecipe.statusCode) return next(newRecipe);
  
  res.status(HTTP_CREATED_STATUS).json(newRecipe);
};

module.exports = {
  addRecipe,
};
