const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/errorAuth');
const { SECRET_STRING } = require('../utils/config');

const auth = (req, res, next) => {
  let token;
  try {
    token = req.cookies.jwt;
  } catch (err) {
    throw new ErrorAuth('Необходимо авторизоваться');
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    throw new ErrorAuth('Необходимо авторизоваться');
  }

  req.user = payload;
  next();
};

module.exports = auth;
