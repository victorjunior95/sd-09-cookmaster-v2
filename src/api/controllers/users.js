const { usersService } = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const payload = req.body;
      const response = await usersService.create(payload);

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
};