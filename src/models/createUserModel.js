const connection = require('./connection');
// const { ObjectID } = require('mongodb');

const createUserModel = async ({ name, email, password, role }) => {
    const newUser = await connection()
      .then((db) => db.collection('users').insertOne({
        name,
        email,
        password,
        role,
      }));

    const response = {
      user: {
        name,
        email,
        role,
        _id: newUser.insertedId,
      },
    };
    return response;
};

const findByemail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return user;
};

module.exports = {
  createUserModel,
  findByemail,
};
