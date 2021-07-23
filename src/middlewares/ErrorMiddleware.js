const HTTP_BAD_REQ = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_CONFLICT = 409;
const HTTP_ERR = 500;

module.exports = (err, _req, res, _next) => {
  if (err.message === 'invalid_data') {
    return res.status(HTTP_BAD_REQ).json({ message: 'Invalid entries. Try again.' });
  }
  if (err.message === 'invalid_email') {
    return res.status(HTTP_CONFLICT).json({ message: 'Email already registered' });
  }
  if (err.message === 'invalid_login_input') {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  if (err.message === 'invalid_login') {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'Incorrect username or password',
    });
  }
  console.log(err);
  res.status(HTTP_ERR).json({ message: 'Internal error' });
};
