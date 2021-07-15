const { BAD_REQUEST, CONFLICT } = require('../constants/http.json');

module.exports = (err, _request, response, _next) => {
  if (err) {
    if (err.code === 'invalid_data') {
      return response.status(BAD_REQUEST).json(err);
    }
    if (err.code === 'existing_email') {
      return response.status(CONFLICT).json(err);
    } 
  }
};
