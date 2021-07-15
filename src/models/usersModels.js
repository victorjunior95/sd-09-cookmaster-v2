const connection = require('./connection');

const getUserByEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return result;
};

const insertUser = async (userInfo) => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ ...userInfo, role: 'user' }));
  return result;
};

const postNewUser = async (userInfo) => {
  const user = await getUserByEmail(userInfo.email);

  if (user) return user;

  const result = await insertUser(userInfo);
  return { insertedId: result.insertedId };
};

module.exports = {
  postNewUser,
};
