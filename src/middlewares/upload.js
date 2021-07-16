const path = require('path');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });
// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = upload;