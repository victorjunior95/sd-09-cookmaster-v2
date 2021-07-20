const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipes');

const secret = 'senhaPower';

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
const ERROR = 500;
const ID_LENGTH = 24;
const TOKEN_LENGTH = 20;

const validateData = (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
      return res
        .status(BAD_REQUEST)
        .json({ message: 'Invalid entries. Try again.' });
    }
  } catch (error) {
    res.status(ERROR).json(error);
  }
  next();
};

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    }
  } catch (error) {
    res.status(ERROR).json(error);
  }
  next();
};

const TokenAuthorization = async (req, res, next) => {
  try {
    const { id: recipeId } = req.params;
    const token = req.headers.authorization;
    const { id, role } = jwt.verify(token, secret);

    const { userId } = await recipesModel.recipesById(recipeId);
    if (!role === 'admin' || !id === userId) {
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
  } catch (err) {
    res.status(ERROR).json(err);
  }
  next();
};

const tokenMalformed = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token.length < TOKEN_LENGTH) {
        return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
  } catch (error) {
      res.status(ERROR).json(error);
  }
  next();
};

const validateId = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (id.length < ID_LENGTH) {
        return res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }
    next();
};

module.exports = {
    validateId,
    tokenMalformed,
    TokenAuthorization,
    validateData,
    tokenValidation,
};