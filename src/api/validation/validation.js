const jwt = require('jsonwebtoken');
const User = require('../../model/userModel');
const dataErr = require('../helpers/index');

const secret = 'tokensupersecreto';

/* const test = 'token da nargas' */

const validationRecipes = async (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    throw dataErr(401, 'jwt malformed');
  }
  try {
    const decoded = jwt.verify(token, secret);
    const recipes = await User.getOneUser(decoded.data.email);
    if (!recipes) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }
    const { _id } = recipes;
    req.userId = _id;
    next();

  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validationRecipes,
}; 
