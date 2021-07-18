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

module.exports = { registerRecipe };
