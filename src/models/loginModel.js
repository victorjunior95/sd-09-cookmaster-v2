const connection = require('../middlewares/conn');

const userLogin = async (email, password) => {
  const user = await connection().then((db) => 
    db.collection('users').findOne({ email, password }));
  return user;
};

module.exports = { userLogin };
