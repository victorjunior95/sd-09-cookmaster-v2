const multer = require('multer');
const { INVALID_FORMAT_IMAGE } = require('../Messages/errors');
const validateLogin = require('./validateLogin');
const autUser = require('../services/autUser');

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg') {
    req.fileValidationError = true;

    return cb(null, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ fileFilter, storage });

const insertImage = [
  upload.single('image'),
  validateLogin,
  async (req, res) => {
    if (req.fileValidationError) {
      const { code, message } = INVALID_FORMAT_IMAGE;
      return res.status(code).json({ message });
    }
    const { id } = req.params;
    const { path } = req.file;
    const { _id, role } = req.payload;

    const modelPath = `localhost:3000/${path}`;
    const result = await autUser(id, _id, role, modelPath);
    // console.log(req.payload);
    console.log(result);
    return res.status(200).json(result);
  },
];

module.exports = insertImage;
