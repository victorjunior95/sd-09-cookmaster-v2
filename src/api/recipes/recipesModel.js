const { useCollection } = require('../db');

const COLLECTION_NAME = 'recipes';
const collection = async () => useCollection(COLLECTION_NAME);

const create = async (recipeData) => collection()
  .then((coll) => coll.insertOne(recipeData));

const findByQuery = async (query) => collection()
  .then((coll) => coll.findOne(query));

module.exports = {
  create,
  findByQuery,
};
