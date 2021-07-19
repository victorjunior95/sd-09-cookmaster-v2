const jwt = require('jsonwebtoken');
const User = require('../../Models/usersModel');

const secret = 'tokensupersecreto';

const validateRecipeData = (code, message) => ({ code, message });

const recipeValidate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw validateRecipeData(401, 'jwt malformed');
  }
  try {
    const decoded = jwt.verify(token, secret);
    const recipe = await User.getOne(decoded.data.email);

    if (!recipe) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }

    const { _id } = recipe;

    req.userId = _id;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  recipeValidate,
};