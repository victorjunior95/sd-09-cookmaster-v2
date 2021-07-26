const { Router } = require('express');
const multer = require('multer');
const recipesController = require('../controller/recipeController');
const tokenValidation = require('../middlewares/tokenValidation');

 const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    const { mimetype } = file;
    const extension = mimetype.split('/')[1];
    callback(null, `${req.params.id}.${extension}`);
  },
}); 

const upload = multer({ storage });

const recipeRoute = Router();

recipeRoute
  .post('/', tokenValidation, recipesController.createRecipes)
  .get('/', recipesController.getRecipes);

recipeRoute
  .get('/:id', recipesController.findRecipes)
  .put('/:id', tokenValidation, recipesController.updateRecipes)
  .delete('/:id', tokenValidation, recipesController.deleteRecipes);
  
 recipeRoute
  .put('/:id/image', tokenValidation,
  
  upload.single('image'),
  recipesController.imageUpdate);

recipeRoute  
  .get('/images/:id.jpeg', recipesController.getImage);  
 
module.exports = recipeRoute;
