const connection = require('./connection');

const registerRecipe = async (recipe) => {
  const db = await connection();
  const register = await db.collection('recipes').insertOne(recipe);
  // o insertProduct.ops retorna um array que na posiçao zero tem a minha inserção
  return register.ops[0];
};

module.exports = {
  registerRecipe,
};