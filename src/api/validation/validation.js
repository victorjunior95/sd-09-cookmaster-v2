const jwt = require('jsonwebtoken');
const User = require('../../model/userModel');

const secret = 'tokensupersecreto';

/* const test = 'token da nargas' */

const validateRecipeData = (code, message) => ({ code, message });

dataErr = require('../helpers/index')

const validationRecipes = async (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {

    throw dataErr(401, 'jwt malformed');

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
  validationRecipes,
}; 