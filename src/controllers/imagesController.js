const path = require('path');

const getImage = async (req, res) => {
  const { id } = req.params;
  const imagePath = path.resolve(__dirname, '..', 'uploads', id);
  return res.status(200).sendFile(imagePath);
};

module.exports = {
  getImage,
};
