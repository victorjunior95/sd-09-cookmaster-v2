const multer = require('multer');

const errorHandling = (err, _req, res, _next) => {
  const result = res.status(err.status).json({ message: err.message });
  return result;
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

module.exports = {
  errorHandling,
  storage,
};