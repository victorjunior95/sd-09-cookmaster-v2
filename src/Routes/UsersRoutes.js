const rescue = require('express-rescue');
const { createUser, login, newAdmin } = require('../controllers/Users');
const { validateToken } = require('../middlewares');

const UserRoutes = (app) => {
  app.route('/users')
    .post(rescue(createUser));
  app.route('/users/admin')
    .post(validateToken, rescue(newAdmin));
  app.route('/login')
    .post(rescue(login));
};

module.exports = UserRoutes;
