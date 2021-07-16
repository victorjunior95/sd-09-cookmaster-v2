const express = require('express');
const multer = require('multer');

const UserController = require('../controllers/UsersController');
const RecipeController = require('../controllers/RecipesController');
const getError = require('../middlewares/error');
const { validateUser, validateLogin } = require('../middlewares/validateUser');
const validateRecipe = require('../middlewares/validateRecipe');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => { callback(null, 'src/uploads'); },
  filename: (req, _file, callback) => { callback(null, `${req.params.id}.jpeg`); },
});

const upload = multer({ storage });
const router = express.Router();
router.get('/users', UserController.list);

router.post('/users', validateUser, UserController.register);

router.post('/login', validateLogin, UserController.login);

router.get('/recipes', RecipeController.listRecipes);

router.get('/recipes/:id', RecipeController.listOneRecipe);

router.put('/recipes/:id', RecipeController.update);

router.put('/recipes/:id/image', upload.single('image'), RecipeController.putImage);

router.post('/recipes', validateRecipe, RecipeController.register);

router.delete('/recipes/:id', RecipeController.remove);

router.use(getError);

module.exports = router;