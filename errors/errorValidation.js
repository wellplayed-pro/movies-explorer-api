const { ERROR_VALIDATION } = require('./typical_errors');

class ErrorValidation extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_VALIDATION;
  }
}

module.exports = ErrorValidation;
