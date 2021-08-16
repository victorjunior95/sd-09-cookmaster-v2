const express = require('express');
const multer = require('multer');

const validateToken = require('../api/auth/validateToken');
const validateUser = require('../api/auth/validateUser');
const recipeController = require('../controllers/Recipes');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/', validateToken, recipeController.registerRecipe);
router.get('/', recipeController.getAllRecipe);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', validateToken, validateUser, recipeController.updateRecipe);
router.delete('/:id', validateToken, validateUser, recipeController.deleteRecipe);
router.put('/:id/image', validateToken, validateUser, upload
  .single('image'), recipeController.newURL);

module.exports = router;
