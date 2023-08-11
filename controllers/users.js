const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const ErrorAuth = require('../errors/errorAuth');
const ErrorConflict = require('../errors/errorConflict');
const ErrorValidation = require('../errors/errorValidation');
const ErrorDefault = require('../errors/errorDefault');
const ErrorNotFound = require('../errors/errorNotFound');
const { SECRET_STRING } = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name, about, avatar, email, password: hashedPassword,
    }))
    .then((user) => res.send(user.toJSON()))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorValidation('Переданы некорректные данные'));
      } else if (error.code === 11000) {
        next(new ErrorConflict('Пользователь с таким email уже существует'));
      }
      next(error);
    });
};

const updateProfileUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorValidation('Переданы некорректные данные'));
      } else {
        next(new ErrorDefault('На сервере произошла ошибка'));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new ErrorAuth('Пользователь не найден'))
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
            throw new ErrorAuth('Неправильный пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new ErrorNotFound('Пользователь с указанным id не существует'))
    .then((user) => res.send(user))
    .catch((error) => next(error));
};

module.exports = {
  createUser,
  updateProfileUser,
  login,
  getUserInfo,
};
