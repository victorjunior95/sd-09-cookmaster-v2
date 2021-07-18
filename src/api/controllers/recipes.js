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

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await recipesService.getById(id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const response = await recipesService.update({ ...payload, id });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};