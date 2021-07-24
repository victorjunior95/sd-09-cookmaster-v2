const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');

const {
  validateJWT,
} = require('../services/recipeValid');

const {
  createRecipesControl,
  getAllRecipesControl,
  getRecipeByIdControl,
  updateRecipeByIdControl,
  deleteRecipeByIdControl,
  uploadImageControl,
} = require('../controllers/recipeControl');

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

router.post('/', validateJWT, rescue(createRecipesControl));

router.put('/:id/image/',
validateJWT, upload.single('image'), rescue(uploadImageControl));

router.get('/:id', rescue(getRecipeByIdControl));

router.get('/', rescue(getAllRecipesControl));

router.put('/:id', validateJWT, rescue(updateRecipeByIdControl));

router.delete('/:id', validateJWT, rescue(deleteRecipeByIdControl));

module.exports = router;