const connection = require('./connections');

const newUserModel = async (newUserData) => {
  const dataWithRole = { ...newUserData, role: 'user' };
  return connection()
    .then((db) => db.collection('users').insertOne(dataWithRole))
.then((result) => result.ops[0]);
};

const existingEmailModel = async (userEmail) => 
  connection()
    .then((db) => db.collection('users').findOne({ email: userEmail }));

const getUserByEmail = async (email) => connection()
.then((db) => db.collection('users').findOne({ email }));

const newAdminModel = async (newData) => connection()
  .then((db) => db.collection('users').insertOne(newData)).then((result) => result.ops[0]);

module.exports = {
  newUserModel,
  existingEmailModel,
  getUserByEmail,
  newAdminModel,
};
