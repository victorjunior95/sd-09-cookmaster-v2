const connect = require('./connection');

const findByEmail = async (email) => {
  const connection = await connect();

  const user = await connection.collection('users').findOne({ email });

  return Boolean(user);
};

const register = async (user) => {
  const connection = await connect();

  const answer = await connection.collection('users')
  .insertOne(user);

  return answer.ops[0];
};

const getAll = async () => {
  const connection = await connect();

  const answer = await connection.collection('users')
  .find().toArray();

  return answer;
};

module.exports = {
  findByEmail,
  register,
  getAll,
};
