// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const allRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .find({}).toArray());

  return result;
};

module.exports = {
  allRecipes,
};
