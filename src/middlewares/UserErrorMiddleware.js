const HTTP_BAD_REQ = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_CONFLICT = 409;

module.exports = (err, _req, res, next) => {
  switch (err.message) {
    case 'invalid_login': 
      return res.status(HTTP_UNAUTHORIZED).json({ message: 'Incorrect username or password' });
    case 'invalid_input':
      return res.status(HTTP_UNAUTHORIZED).json({ message: 'All fields must be filled' });
    case 'invalid_email':
      return res.status(HTTP_CONFLICT).json({ message: 'Email already registered' });
    case 'invalid_data':
      return res.status(HTTP_BAD_REQ).json({ message: 'Invalid entries. Try again.' });
    default:
      next(err);
      break;
  }
};
