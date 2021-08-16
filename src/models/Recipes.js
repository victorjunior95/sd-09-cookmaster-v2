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

module.exports = {
  register,
  getAll,
};
