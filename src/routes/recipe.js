const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path'); // usado para caminhos de diferentes SOS

const recipeController = require('../controller/recipe');

const router = express.Router();

/* https://github.com/tryber/sd-08-live-lectures/tree/lecture/28.2 */
const storage = multer.diskStorage({
  destination: (_request, _file, callback) =>
    callback(null, path.join(__dirname, '..', 'uploads')),
  filename: (_request, file, callback) => {
    callback(null, `${file.originalname}`);
  },
});

const upload = multer({ storage }); // middleware multer

router.post(
  '/',
  rescue(recipeController.newRecipeController),
);

router.get(
  '/',
  rescue(recipeController.listRecipesController),
);

router.get(
  '/:id',
  rescue(recipeController.recipeByIdController),
);

router.put(
  '/:id',
  rescue(recipeController.editedRecipeController),
);

router.delete(
  '/:id',
  rescue(recipeController.excludeRecipeController),
);

router.put(
  '/:id/image',
  upload.single('image'), // manda apenas um arquivo
  rescue(recipeController.addImageRecipeController),
);

module.exports = router;
