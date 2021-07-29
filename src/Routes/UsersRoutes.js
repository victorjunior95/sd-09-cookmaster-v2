const rescue = require('express-rescue');
const { createUser, login } = require('../controllers/Users');

const UserRoutes = (app) => {
  app.route('/users')
    .get((req, res) => {
      res.send('foi!');
    })
    .post(rescue(createUser));
  app.route('/login')
    .post(rescue(login));
};

module.exports = UserRoutes;
