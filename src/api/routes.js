const express = require('express');
const multer = require('multer');

const routes = express.Router();

const {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  getImage,
  uploadImage,
} = require('../controllers/recipes');

const {
  createAdmin,
  createUser,
  login,
} = require('../controllers/users');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'src/uploads/'),
  filename: (req, file, cb) => {
    const { id } = req.params;
    const split = file.originalname.split('.');
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

routes.post('/users', createUser);
routes.post('/login', login);
routes.post('/recipes', createRecipe);
routes.get('/recipes', getAllRecipes);
routes.get('/recipes/:id', getOneRecipe);
routes.put('/recipes/:id', updateRecipe);
routes.delete('/recipes/:id', deleteRecipe);
routes.put('/recipes/:id/image', upload.single('image'), uploadImage);
routes.get('/images/:id.jpeg', getImage);
routes.post('/users/admin', createAdmin);

module.exports = routes;
