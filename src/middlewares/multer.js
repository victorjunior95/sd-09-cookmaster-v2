const path = require('path');
const multer = require('multer');

const multerMiddleware = multer({ dest: path.join(__dirname, '..', 'uploads') });

module.exports = multerMiddleware;
