const connect = require('./connection');

const findByEmail = async (email) => {
  const connection = await connect();
  const user = await connection.collection('users').findOne({ email });

  return Boolean(user);
};

const register = async (user) => {
  const connection = await connect();
  const newUser = await connection.collection('users')
    .insertOne(user);

  return newUser.ops[0];
};

module.exports = {
  findByEmail,
  register,
};
