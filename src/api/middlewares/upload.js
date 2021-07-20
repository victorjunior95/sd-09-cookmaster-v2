const path = require('path');
const multer = require('multer');

const FOLDER = path.join(__dirname, '..', '..', 'uploads');

const upload = multer({ dest: FOLDER });

const recipeIdNameStorage = multer.diskStorage({
  destination: FOLDER,
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const memoryStorage = multer.memoryStorage();

const recipeUpload = multer({ storage: recipeIdNameStorage });

const memoryUpload = multer({ storage: memoryStorage });

module.exports = {
  upload,
  recipeUpload,
  memoryUpload,
  FOLDER,
};
