const { ERROR_AUTH } = require('./typical_errors');

class ErrorAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_AUTH;
  }
}

module.exports = ErrorAuth;
