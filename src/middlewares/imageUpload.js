const multer = require('multer');
const { join } = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload.single('image');
