const path = require('path');
const multer = require('multer');

const imgStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads')); // passa o caminho pelo path.join
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadImage = multer({ imgStorage });

module.exports = uploadImage;