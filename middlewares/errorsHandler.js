const { ERROR_DEFAULT, SERVER_ERROR_MESSAGE } = require('../errors/typical_errors');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT } = err;
  const message = statusCode === ERROR_DEFAULT ? SERVER_ERROR_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorsHandler;
