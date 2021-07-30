const rescue = require('express-rescue');
const { createUser, login } = require('../controllers/Users');

const UserRoutes = (app) => {
  app.route('/users')
    .post(rescue(createUser));
  app.route('/users/admin')
    .post();
  app.route('/login')
    .post(rescue(login));
};

module.exports = UserRoutes;
