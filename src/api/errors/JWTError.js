class JWTError extends Error {
  constructor() {
    super();
    this.name = 'JWTError';
    this.http = 401;
    this.message = 'jwt malformed';
  }
}

module.exports = JWTError;