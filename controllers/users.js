const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const ErrorAuth = require('../errors/errorAuth');
const ErrorConflict = require('../errors/errorConflict');
const ErrorValidation = require('../errors/errorValidation');
const ErrorDefault = require('../errors/errorDefault');
const ErrorNotFound = require('../errors/errorNotFound');
const { SECRET_STRING } = require('../utils/config');
const {
  BAD_DATA_MESSAGE,
  USER_CONFLICT_EMAIL_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_LOGOUT_MESSAGE,
  SERVER_ERROR_MESSAGE,
  USER_WRONG_AUTH_MESSAGE,
} = require('../errors/typical_errors');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name, email, password: hashedPassword,
    }))
    .then((user) => res.send(user.toJSON()))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorValidation(BAD_DATA_MESSAGE));
      } else if (error.code === 11000) {
        next(new ErrorConflict(USER_CONFLICT_EMAIL_MESSAGE));
      }
      next(error);
    });
};

const updateProfileUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorValidation(BAD_DATA_MESSAGE));
      } else if (error.code === 11000) {
        next(new ErrorConflict(USER_CONFLICT_EMAIL_MESSAGE));
      } else {
        next(new ErrorDefault(SERVER_ERROR_MESSAGE));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new ErrorAuth(USER_NOT_FOUND_MESSAGE))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({ _id: user._id }, SECRET_STRING);
            res.cookie('jwt', jwt, {
              maxAge: 36000000,
              httpOnly: true,
              sameSite: true,
            });
            res.send(user);
          } else {
            throw new ErrorAuth(USER_WRONG_AUTH_MESSAGE);
          }
        })
        .catch(next);
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: USER_LOGOUT_MESSAGE });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new ErrorNotFound(USER_NOT_FOUND_MESSAGE))
    .then((user) => res.send(user))
    .catch((error) => next(error));
};

module.exports = {
  createUser,
  updateProfileUser,
  login,
  getUserInfo,
  logout,
};
