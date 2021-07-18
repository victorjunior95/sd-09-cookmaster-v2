const { recipesService } = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const payload = req.body;
      const { _id: userId } = req.user;
      const response = await recipesService.create(payload, userId);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getAll(_req, res, next) {
    try {
      const response = await recipesService.getAll();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};