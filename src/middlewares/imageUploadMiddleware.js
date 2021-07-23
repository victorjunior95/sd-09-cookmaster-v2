const multer = require('multer');
const recipesModel = require('../models/recipesModel');

const validationError = (status, message) => ({ status, message });

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const imgUploadUserCheck = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const recipeToAddImg = await recipesModel.getRecipeById(id);
  if (!recipeToAddImg) return next(validationError(404, 'recipe not found'));
  if (recipeToAddImg.userId === user.id || user.role === 'admin') return next();
  next(validationError(403, 'forbidden action'));
};

module.exports = {
  upload,
  imgUploadUserCheck,
};
