const { ERROR_FORBIDDEN } = require('./typical_errors');

class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN;
  }
}

module.exports = ErrorForbidden;
