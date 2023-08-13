const ERROR_VALIDATION = 400;
const ERROR_AUTH = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_CONFLICT = 409;
const ERROR_DEFAULT = 500;

const BAD_DATA_MESSAGE = 'Переданы некорректные данные';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм не найден';
const MOVIE_FORBIDDEN_MESSAGE = 'Удалить можно только свой фильм';
const USER_CONFLICT_EMAIL_MESSAGE = 'Данный email уже зарегистрирован на сайте';
const USER_NOT_FOUND_MESSAGE = 'Нет пользователя с таким id';
const USER_UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
const USER_LOGOUT_MESSAGE = 'Выход из аккаунта';
const USER_WRONG_AUTH_MESSAGE = 'Неверные почта или пароль';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const BAD_URL_MESSAGE = 'Введите корректный адрес ссылки';

module.exports = {
  ERROR_VALIDATION,
  ERROR_AUTH,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_DEFAULT,
  BAD_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
  USER_CONFLICT_EMAIL_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_LOGOUT_MESSAGE,
  USER_UNAUTHORIZED_MESSAGE,
  SERVER_ERROR_MESSAGE,
  BAD_URL_MESSAGE,
  USER_WRONG_AUTH_MESSAGE,
};
