const usersServices = require('../services/usersServices');

const postNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await usersServices.postNewUser({ name, email, password });

  if (result.error) return next(result.error);

  res.status(201).json({
    user: {
      name,
      email,
      role: 'user',
      _id: result.insertedId,      
    },
  });
};

module.exports = {
  postNewUser,
};
