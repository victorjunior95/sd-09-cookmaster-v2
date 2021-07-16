class JWTError extends Error {
  constructor() {
    super();
    this.name = 'JWTError';
    this.message = 'jwt malformed';
  }
}

module.exports = JWTError;
