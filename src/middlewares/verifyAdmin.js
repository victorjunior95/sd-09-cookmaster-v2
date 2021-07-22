module.exports = (req, res, next) => {
  const { userRole } = req;

  if (userRole !== 'admin') {
    return next({
      status: 403,
      message: 'Only admins can register new admins',
    });
  }

  return next();
};
