const connection = require('./connections');

const validateLogin = async (user) => {
  const validate = await connection().then((db) =>
    db.collection('users').findOne({ ...user }));

  return validate;
};

module.exports = {
  validateLogin,
};
