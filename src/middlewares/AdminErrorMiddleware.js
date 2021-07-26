const HTTP_FORBIDDEN = 403;

module.exports = (err, _req, res, next) => {
  switch (err.message) {
    case 'not_admin': 
      return res.status(HTTP_FORBIDDEN).json({ message: 'Only admins can register new admins' });
    default:
      next(err);
      break;
  }
};
