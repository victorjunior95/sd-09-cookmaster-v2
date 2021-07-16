const { Router } = require('express');

const OK = '200';

const imagesController = Router();

imagesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.status(OK).send(`${id}`);
});

module.exports = imagesController;