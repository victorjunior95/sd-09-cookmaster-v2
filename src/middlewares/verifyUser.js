const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');
const RecipesModel = require('../models/RecipesModel');

const SECRET = 'TH!S!S@s3CR3t';

const getUser = async (token) => {
  const payload = jwt.verify(token, SECRET); 
  const currentUser = await UsersModel.findByEmail(payload.email);
  return currentUser;
};

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    const currentUser = await getUser(token);
    const currentRecipe = await RecipesModel.find(id);
    const { _id, role } = currentUser[0];
    const { userId } = currentRecipe;
    if (userId.toString() === _id.toString() || role === 'admin') return next();
    return res.status(401);
  } catch (e) {
    next(e);
  }
};

module.exports = verifyUser;