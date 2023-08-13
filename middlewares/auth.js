const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/errorAuth');
const { SECRET_STRING } = require('../utils/config');
const { USER_UNAUTHORIZED_MESSAGE } = require('../errors/typical_errors');

const auth = (req, res, next) => {
  let token;
  try {
    token = req.cookies.jwt;
  } catch (err) {
    throw new ErrorAuth(USER_UNAUTHORIZED_MESSAGE);
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    throw new ErrorAuth(USER_UNAUTHORIZED_MESSAGE);
  }

  req.user = payload;
  next();
};

module.exports = auth;
