const connection = require('./connection');

const registerUser = async ({ name, email, password, role = 'user' }) => {
  const connect = await connection();
  const users = await connect.collection('users')
    .insertOne({ name, email, password, role });
  return users.ops[0];
};

const findUser = async (email) => {
  const connect = await connection();
  const user = await connect.collection('users')
    .findOne({ email });
  return user;
};

module.exports = {
  registerUser,
  findUser,
};
