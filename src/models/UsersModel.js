const connection = require('./connection');

const listAllUsers = async () => {
  const conn = await connection();
  const users = conn.collection('users').find().toArray();

  return users;
};

const findByEmail = async (email) => {
  const findResult = await connection()
  .then((db) => db.collection('users').findOne({ email }));
  return findResult;
};

const registerUser = async (userData) => {
  const insertResponse = await connection()
  .then((db) => db.collection('users').insertOne(userData));
  return {
    user: {
      _id: insertResponse.insertedId,
      name: userData.name,
      email: userData.email,
      role: 'user',
    },
  };
};

module.exports = {
  listAllUsers,
  registerUser,
  findByEmail,
}; 