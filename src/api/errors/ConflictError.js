class ConflictError extends Error {
  /**
   *
   * @param {string} field string relative to the field name that is already registered in the database
   */

  constructor(field) {
    super();
    this.name = 'ConflictError';
    this.http = 409;
    this.message = `${field} already registered`;
  }
}

module.exports = ConflictError;
