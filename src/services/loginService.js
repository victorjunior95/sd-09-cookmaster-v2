const jwt = require('jsonwebtoken');
const status = require('../status/httpCodes');
const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');

const secret = 'parangaricutirimirruaro';

const validEntries = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(status.BAD_REQUEST).json({ message: status.BAD_REQUEST_MESSAGE });
  }
  next();
};

const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MISSING });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findUserByEmail(decoded.data);
    if (!user) {
      return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
  }
};

const recipeValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MISSING });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findUserByEmail(decoded.data);
    const recipe = await recipeModel.getRecipeById(id);
    if (!user._id === recipe.userId || !user.role === 'admin') {
      return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
    }
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
  }
  next();
};

module.exports = {
  validEntries,
  validToken,
  recipeValidation,
};