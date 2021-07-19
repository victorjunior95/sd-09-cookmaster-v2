const path = require('path');

const { recipesService } = require('../services');
const { NotFoundError } = require('../errors');

module.exports = {
  async getByFileName(req, res, next) {
    try {
      const { image } = req.params;
      const response = await recipesService.getById(image.replace('.jpeg', ''));

      if (!response || !Object.keys(response).length) {
        throw new NotFoundError('recipe');
      }

      const { image: imageResponse } = response;
      const imgPath = path.join(
        __dirname, '..', '..', '..',
        `uploads/${imageResponse.replace('localhost:3000/src/uploads/', '')}`,
      );

      res.set('Content-Type', 'image/jpeg');
      res.status(200).sendFile(imgPath);
    } catch (err) {
      next(err);
    }
  },
};