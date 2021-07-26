const cookmasterDb = require('../model/cookmasterDb');

const emailExistingValidation = async (req, res, next) => {
  const { email } = req.body;
  const usersDb = await cookmasterDb().then((db) => db.collection('users'));
  const isFound = await usersDb.find({ email }).count() > 0;
  if (isFound) return res.status(409).json({ message: 'Email already registered' });
  next();
};

module.exports = emailExistingValidation;
