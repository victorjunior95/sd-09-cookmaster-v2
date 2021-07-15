const { connection } = require('./connection');

const postIntoDb = async (name, ingredients, preparation) => {
  const db = await connection();

  const collection = await db.collection('recipes');

  const recipe = await collection.insertOne({ name, ingredients, preparation });

  const id = await recipe.insertedId;

  return recipe && { _id: id, name, ingredients, preparation };
};

module.exports = {
  postIntoDb,
};
