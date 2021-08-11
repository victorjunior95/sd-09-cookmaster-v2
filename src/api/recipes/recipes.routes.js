const Router = require('express').Router();
const multer = require('multer');

const {
  addRecipe,
  listRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  canEdit,
  addImageToRecipe,
} = require('./recipes.controller');

const { jwtVerifications } = require('../login/login.controller');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: async (req, _file, callback) => {
    const { id } = req.params;
    return callback(null, `${id}.jpeg`);
  },
 });
const upload = multer({ storage });

Router.route('/')
  .get(listRecipes)
  .post(addRecipe);

Router.route('/:id')
  .put(updateRecipeById)
  .delete(deleteRecipeById)
  .get(getRecipeById);

Router.route('/:id/image')
  .put(jwtVerifications, canEdit, upload.single('image'), addImageToRecipe);

module.exports = Router;
