const { usersService } = require('../services');
const { PermissionError } = require('../errors');

module.exports = {
  async createUser(req, res, next) {
    try {
      const payload = req.body;
      const response = await usersService.create({ ...payload, role: 'user' });

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    try {
      const payload = req.body;
      const response = await usersService.login(payload);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async createAdmin(req, res, next) {
    try {
      const { role } = req.user;

      if (role !== 'admin') {
        throw new PermissionError('Only admins can register new admins');
      }

      const payload = req.body;
      console.log(payload);
      const response = await usersService.create({ ...payload, role: 'admin' });

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};