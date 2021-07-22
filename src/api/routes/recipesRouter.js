const express = require('express');
const multer = require('multer');

const { checkRecipeInput } = require('../middlewares/recipesMiddlewares');
const { 
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipeById, 
  updateRecipe, 
  insertRecipeImage } = require('../controllers/recipesController');

const validateToken = require('../auth/validateJWT');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/', checkRecipeInput, validateToken, postNewRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipeById);

router.put('/:id', validateToken, updateRecipe);

router.delete('/:id', validateToken, deleteRecipeById);

router.put('/:id/image', validateToken, upload.single('image'), insertRecipeImage);

module.exports = router;