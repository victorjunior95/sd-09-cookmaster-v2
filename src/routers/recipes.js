const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const validateJWT = require('../api/auth/validateJWT');
const recipesController = require('../controllers/recipesController');

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

router.post('/', validateJWT, rescue(recipesController.create));
router.put('/:id/image/', 
validateJWT, upload.single('image'), rescue(recipesController.postImage));
router.get('/:id', rescue(recipesController.getById));
router.get('/', rescue(recipesController.getAll));
router.put('/:id', validateJWT, rescue(recipesController.updateById));
router.delete('/:id', validateJWT, rescue(recipesController.deleteById));

module.exports = router;