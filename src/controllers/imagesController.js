const rescue = require('express-rescue');
// const { getImageService } = require('../services/imageServices');

const printImage = rescue(async (req, res, _next) => {
  const { id } = req.params;
  // const getImage = await getImageService(id);
   
  return res.status(200).sendFile(`../uploads/${id}.jpeg`);
});

module.exports = {
  printImage,
};