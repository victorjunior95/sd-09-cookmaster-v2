const connection = require('./connection');

const registerUser = async (userData, nivel) => {
  const connect = await connection();
  const users = await connect.collection('users').insertOne({ userData, nivel });
  return users.ops[0];
};

const listAllUsers = async () => {
  const connect = await connection();
  const listUsers = await connect.collection('users').find().toArray();
  return listUsers;
};

module.exports = {
  registerUser,
  listAllUsers,
};
