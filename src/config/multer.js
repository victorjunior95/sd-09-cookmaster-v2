const multer = require('multer');
const path = require('path');

module.exports = {
  dest: path.resolve(__dirname, '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, _file, callback) => {
      const { id } = req.params;
      const fileName = `${id}.jpeg`;
      callback(null, fileName);
    },
  }),
};