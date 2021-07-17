const connect = require('../configdatabase/conn');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const database = connect()
    .then((db) => db.collection('recipes').insertOne({
      name, ingredients, preparation, userId,
    })).then((result) => result.ops[0]);

  return database;
};

const getAllRecipes = async () => {
  const database = connect()
    .then((db) => db.collection('recipes').find().toArray());
    return database;
};

module.exports = {
  createRecipes,
  getAllRecipes,
};
