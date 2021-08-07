const multer = require('multer');
const Recipe = require('../service/Recipe');

module.exports = multer.diskStorage({ 
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: async (req, _file, callback) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    const { _id: recipeId } = recipe;
    return callback(null, `${recipeId}.jpeg`);
  },
 });