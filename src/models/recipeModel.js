const connection = require('../middlewares/conn');

const registerRecipe = async (name, ingredients, preparation, id) => {
  const newRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId: id,
    }).then((result) => result.ops[0]));
  return newRecipe;
};

const getAllRecipes = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find({}).toArray());
  return result;
};

module.exports = {
  registerRecipe,
  getAllRecipes,
};
