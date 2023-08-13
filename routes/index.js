const router = require('express').Router();
const ErrorNotFound = require('../errors/errorNotFound');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../utils/regex');
const { BAD_URL_MESSAGE } = require('../errors/typical_errors');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.post('/signout', logout);

router.use('*', (req, res, next) => {
  next(new ErrorNotFound(BAD_URL_MESSAGE));
});

module.exports = router;
