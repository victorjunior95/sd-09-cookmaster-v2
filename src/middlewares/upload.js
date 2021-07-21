const multer = require('multer');
const path = require('path');

const pathRoute = path.join(__dirname, '..', 'uploads');

const uploadImage = multer.diskStorage({
  // recebe o id da imagem
  destination: pathRoute,
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const storageImage = multer({ storage: uploadImage });

module.exports = storageImage;