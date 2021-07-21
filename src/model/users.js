const connection = require('./connection');

const registerUser = async ({ name, email, password, role = 'user' }) => {
  const connect = await connection();
  const users = await connect.collection('users')
    .insertOne({ name, email, password, role });
  return users.ops[0];
};

const listAllUsers = async () => {
  const connect = await connection();
  const listUsers = await connect.collection('users')
    .find().toArray();
  return listUsers;
};

module.exports = {
  registerUser,
  listAllUsers,
};
