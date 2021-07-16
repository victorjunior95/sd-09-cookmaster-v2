const express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },

  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipesController = require('../../../controllers/recipesController');
const {
  validateToken,
  validateRecipesFields,
} = require('../../../middlewares');

const router = express.Router();

router.post('/', [validateToken, validateRecipesFields, recipesController.add]);

router.get('/', [recipesController.getAll]);
router.get('/:id', [recipesController.getById]);

router.put('/:id', [validateToken, recipesController.update]);
router.put('/:id/image', [validateToken, upload.single('image'), recipesController.upload]);

router.delete('/:id', [validateToken, recipesController.remove]);

module.exports = router;
