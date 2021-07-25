const connection = require('./connections');

module.exports = async (user) => {
  const validate = await connection().then((db) =>
    db.collection('users').findOne({ ...user }));

  return validate;
};
