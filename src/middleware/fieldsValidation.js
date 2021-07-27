const fieldsValidation = (fields, req, res, next) => {
  if (!Array.isArray(fields)) return console.log('fields must be an array in fieldsValidation()');
  const isSomeFieldInvalid = fields.find((field) => {
    if (!req.body[field]) return true;
    return false;
  });
  if (isSomeFieldInvalid) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  console.log('All fields are valid');
  next();
};

module.exports = fieldsValidation;
