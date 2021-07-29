const rescue = require('express-rescue');
const controller = require('../controllers/Users');

const UserRoutes = (app) => {
  app.route('/users')
    .get((req, res) => {
      res.send('foi!');
    })
    .post(rescue(controller.createUser));
  app.route('/login')
    .post(controller.login);
};

module.exports = UserRoutes;
