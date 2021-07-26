const fs = require('fs').promises;
const path = require('path');
const { memoryUpload } = require('./upload');
const recipesService = require('../services/recipesService');

module.exports = [
  memoryUpload.single('image'), async (req, res, next) => {
    const { id } = req.params;
    const { host } = req.headers;
    const urlImage = `${host}/src/uploads/${id}.jpeg`;
    try {
      const { buffer } = req.file;
      const filePath = `${path.join(__dirname, '..', 'uploads', id)}.jpeg`;
      await fs.writeFile(filePath, buffer);
      const recipe = await recipesService.updateImage(id, urlImage);
      return res.status(recipe.status).json(recipe.recipeImage);
    } catch (error) {
      return next(error);
    }
  },
];
