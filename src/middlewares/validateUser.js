const { ObjectId } = require('mongodb');
const { getRecipeById } = require('../models/recipesModel');

const validateUser = async (req, res, next) => {
  const { params: { id }, payload } = req;
  if (!ObjectId.isValid(id)) {
    return res.status(401).json({ message: 'invalid id' });
  }
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  const { userId } = recipe;
  const { _id: payloadId, role } = payload;
  if (userId !== payloadId && role !== 'admin') {
    return res.status(401).json({ message: 'missing auth token' });
  }
  next();
};

module.exports = validateUser;
