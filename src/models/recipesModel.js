const connection = require('./connections');

const createRecipe = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));

  return { ...recipe, _id: insertedId };
};

module.exports = {
  createRecipe,
};

/*
 payload
{
  "_id": "60f503074ab04c58880f651b",
  "name": "luke",
  "email": "luke@starwars.com",
  "role": "user",
  "iat": 1626669860,
  "exp": 1626670760
} */
