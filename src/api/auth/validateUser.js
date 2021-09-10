const { ObjectId } = require('mongodb');

const recipesModel = require('../../models/Recipes');

module.exports = async (err, req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    if (!ObjectId.isValid(id)) {
      res.status(err).json({ message: 'missing id' });
    }

    const result = await recipesModel.getById(id);

    if (ObjectId(result.userId).toString() !== ObjectId(_id).toString()) {
      if (req.user.role === 'admin') {
        return next();
      }
      throw new Error('missing auth token');
    }

    next();
  } catch (error) {
    req.error = error.message;

    next();
  }
};
