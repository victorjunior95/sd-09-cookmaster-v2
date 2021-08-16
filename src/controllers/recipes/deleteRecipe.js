const jwt = require('jsonwebtoken');

const RecipeModel = require('../../models/recipes');

const secret = 'Fenix Iorp';

const NO_CONTENT_CODE = 204;
const UNAUTHORIZED_CODE = 401;
const JWT_MALFORMED = 'jwt malformed';
const MISSING_TOKEN_MESSAGE = 'missing auth token';

module.exports = async (req, res, _next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED_CODE).json({ message: MISSING_TOKEN_MESSAGE });
  }

  const decoded = jwt.decode(token, secret);
  if (!decoded) {
    return res.status(UNAUTHORIZED_CODE).json({ message: JWT_MALFORMED });
  }

  const { id } = req.params;
  const { _id } = await RecipeModel.getOneRecipe(id);
  await RecipeModel.removeRecipe(_id);

  res.status(NO_CONTENT_CODE).json();
};
