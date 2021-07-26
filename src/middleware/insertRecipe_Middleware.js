const authentication = require('./authentication_Middleware');
const { insertNewRecipe } = require('../services');

const insertRecipe = async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;

  const userId = await authentication(token);
  if (userId.code === 401) {
    const { code, message } = userId;
    res.status(code).json({ message });
  }
  const { _id } = userId;

  const newRecipe = {
    name, ingredients, preparation, userId: _id,
  };

  const { code, message } = await insertNewRecipe(newRecipe);
  if (code === 201) return res.status(code).json({ recipe: message });
  return res.status(code).json({ message });
};

module.exports = insertRecipe;
