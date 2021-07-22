const imageServices = require('../services/imageServices');

module.exports = {
  showImage: async (req, _res) => {
    const { id } = req.params;

    const showImage = imageServices.showImage(id);

    return showImage;
  },
};
