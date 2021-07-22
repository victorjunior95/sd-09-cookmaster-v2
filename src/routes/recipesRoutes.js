const express = require('express');
const multer = require('multer');
const recipesControllers = require('../controllers/recipesController');
const validate = require('../api/jwt');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

const userRouters = express.Router();

userRouters.post('/', validate.validateToken, recipesControllers.addRecipe);

userRouters.get('/', recipesControllers.listAllRecipes);

userRouters.get('/:id', recipesControllers.listOneRecipe);

userRouters.put('/:id', validate.validateToken, recipesControllers.updateRecipe);

userRouters.delete('/:id', validate.validateToken, recipesControllers.deleteRecipe);

userRouters.put('/:id/image',
  validate.validateToken,
  upload.single('image'),
  recipesControllers.addImage);

module.exports = userRouters;
