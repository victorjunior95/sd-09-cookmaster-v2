const { listAllRecipes } = require('../Models/recipes');

module.exports = async (req, res, _next) => {
  try {
    const data = await listAllRecipes();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
