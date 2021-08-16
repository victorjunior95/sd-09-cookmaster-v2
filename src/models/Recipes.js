const { ObjectId } = require('mongodb');
const connect = require('./connection');

const register = async (recipe) => {
  const connection = await connect();

  const answer = await connection.collection('recipes')
  .insertOne(recipe);

  return answer.ops[0];
};

const getAll = async () => {
  const connection = await connect();

  const answer = await connection.collection('recipes')
  .find().toArray();

  return answer;
};

const getById = async (id) => {
  const connection = await connect();

  const answer = await connection.collection('recipes')
  .findOne(ObjectId(id));

  return answer;
};

module.exports = {
  register,
  getAll,
  getById,
};
