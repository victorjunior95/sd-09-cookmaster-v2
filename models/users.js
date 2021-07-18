const connection = require('./connection');

const getInsertedUser = (userInfos) => {
  const { _id, name, email, role } = userInfos;
  return {
    user: {
      name,
      email,
      role,
      _id,
    },
  };
};

const insertUser = async (name, email, password) => {
  const role = 'user';
  return connection()
    .then((db) => db.collection('users').insertOne({
      name,
      email,
      password,
      role,
    }))
    .then((result) => getInsertedUser(
      {
        _id: result.insertedId,
        name,
        email,
        role,
      },
    ));
};

const getUserByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  insertUser,
  getUserByEmail,
};
