const connection = require('./connection');
const response = require('../middlewares/responseCodes');

const getAllUsers = () => {
  try {
    return connection()
    .then((db) => db.collection('users').find().toArray());
  } catch (error) {
    return error;
  } 
};

const createNewUser = async ({ name, email, password }) => {
  try {
    const registeredUsers = await getAllUsers();
      if (registeredUsers.some((user) => user.email === email)) {
          const errorObj = {
            errorCode: response.CONFLICT,
            message: 'Email already registered',
          };
        return errorObj;
      }
    return connection()
        .then((db) => db.collection('users').insertOne({ name, email, role: 'user', password }))
        .then((result) => result.ops[0]);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
};
