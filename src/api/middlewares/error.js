const { BAD_REQUEST, CONFLICT, UNAUTHORIZED } = require('../constants/http.json');

module.exports = (err, _request, response, _next) => {
  if (err) {
    switch (err.code) {
      case 'invalid_data': return response.status(BAD_REQUEST).json(err);
      case 'existing_email': return response.status(CONFLICT).json(err);
      case 'unauthorized': return response.status(UNAUTHORIZED).json(err);
      default: response.status(500).json(err);
    }
  }
};
