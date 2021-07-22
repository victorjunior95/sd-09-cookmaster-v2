const connection = require('./mongoConnection');

async function addRecipe(tokenData, name, ingredients, preparation) {
  const db = await connection();
  const { _id } = tokenData;
  const response = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: _id,
  });
  return { recipe: response.ops[0] };
}

module.exports = {
  addRecipe,
};
