const rescue = require('express-rescue');

const createRecipe = rescue(async (req, res, _next) => {
  const addRecipe = req.body;
  return res.status(200).json(addRecipe);
});

module.exports = {
  createRecipe,
};