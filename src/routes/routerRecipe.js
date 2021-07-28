const express = require('express');
const multer = require('multer');

const Controller = require('../controllers/RecipesController');
const validateToken = require('../middleware/validateToken');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', validateToken, Controller.createRecipe);
router.get('/', Controller.findAll);
router.get('/:id', Controller.findRecipe);
router.put('/:id', validateToken, Controller.updateOne);
router.delete('/:id', validateToken, Controller.deleteOne);
router.put('/:id/image', validateToken, upload.single('image'), Controller.uploadImg);
router.get('/images/:id', Controller.getImage);

module.exports = router;