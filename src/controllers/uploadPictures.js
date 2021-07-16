const verifyUpload = require('../services/verifyUpload');

const uploadPictures = async (req, res, _next) => {
  const { id } = req.params;

  const data = await verifyUpload(id);

  res.status(200).json(data);
};

module.exports = uploadPictures;
