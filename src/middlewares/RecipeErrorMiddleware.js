const HTTP_BAD_REQ = 400;
const HTTP_NOT_FOUND = 404;

module.exports = (err, _req, res, next) => {
  switch (err.message) {
    case 'invalid_data':
      return res.status(HTTP_BAD_REQ).json({ message: 'Invalid entries. Try again.' });
    case 'not_found': 
      return res.status(HTTP_NOT_FOUND).json({ message: 'recipe not found' });
    default:
      next(err);
      break;
  }
};
