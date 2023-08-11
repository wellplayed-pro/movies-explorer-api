const { ERROR_DEFAULT } = require('./typical_errors');

class ErrorDefault extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_DEFAULT;
  }
}

module.exports = ErrorDefault;
