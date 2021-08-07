const { user } = require('../services');

const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;

const ENTRIES_ERROR = 'Invalid entries. Try again.';

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const err = new Error(ENTRIES_ERROR);

    err.statusCode = HTTP_BAD_REQUEST_STATUS;

    return next(err);
  }

  const newUser = await user.addUser({ name, email, password });

  if (newUser.statusCode) return next(newUser);
  
  res.status(HTTP_CREATED_STATUS).json(newUser);
};

module.exports = {
  addUser,
};
