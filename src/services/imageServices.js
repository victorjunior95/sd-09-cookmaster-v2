const imagesModel = require('../models/imagesModel');

module.exports = {
  showImage: async (image) => {
    const showImage = await imagesModel.showImage(image);
    return showImage;
  },
};
