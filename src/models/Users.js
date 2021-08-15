const connect = require('./connection');

const findByEmail = async (email) => {
  const connection = await connect();
  console.log(`model ${email}`);
  const user = await connection.collection('users').findOne({ email });

  return Boolean(user);
};

const register = async (user) => {
  const connection = await connect();

  const answer = await connection.collection('users')
  .insertOne(user);

  return answer.ops[0];
};

module.exports = {
  findByEmail,
  register,
};
