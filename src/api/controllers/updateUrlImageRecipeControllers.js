const rescue = require('express-rescue');
const uploadImageRecipe = require('../middlewares/uploadImageRecipe');
const services = require('../services');

module.exports = [
  rescue(uploadImageRecipe.single('image')),
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    
    const result = await services
      .updateUrlImageRecipeService(authorization, id, `localhost:3000/src/uploads/${id}.jpeg`);

    res.status(200).json(result);
  })];
