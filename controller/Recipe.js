const Recipe = require('../service/Recipe');

const validateBodyReq = (name, ingredients, preparation) => {
  const params = [name, ingredients, preparation];
  let response = null;
  params.forEach((param) => {
    if (typeof param !== 'string') response = { message: 'Invalid entries. Try again.' };
  });
  return response;
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  const invalid = validateBodyReq(name, ingredients, preparation);
  if (invalid) return res.status(400).json(invalid);
  const newRecipe = await Recipe.create(name, ingredients, preparation, user);
  return res.status(201).json(newRecipe);
};

module.exports = { create };