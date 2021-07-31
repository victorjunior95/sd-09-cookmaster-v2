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

module.exports = {
  newUserModel,
  existingEmailModel,
};
