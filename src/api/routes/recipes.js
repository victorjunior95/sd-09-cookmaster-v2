const router = require('express').Router();
const multer = require('multer');
const { recipesController } = require('../controllers');
const middlewares = require('../middlewares');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.recipe.id}.jpeg`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true;
      return callback(null, false);
    }
    return callback(null, true);
  },
});

// Create a recipe
router.post('/', middlewares.authentication, recipesController.create);

// Get all recipes
router.get('/', recipesController.getAll);

// Get recipe by ID
router.get('/:id', recipesController.getById);

// Update a recipe
router.put('/:id', middlewares.authentication, recipesController.update);

// Remove a recipe
router.delete('/:id', middlewares.authentication, recipesController.remove);

// Add an image to a recipe
router.put(
  '/:id/image',
  middlewares.authentication,
  middlewares.imageHandling,
  upload.single('image'),
  recipesController.addImage,
);

module.exports = router;
