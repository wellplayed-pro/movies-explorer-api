const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const router = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./utils/config');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(helmet());
app.use(rateLimiter);

app.use(cors({
  origin: ['http://localhost:3000', 'https://ambernetdiploma.nomoreparties.co', 'http://ambernet15pr.nomoredomains.xyz'],
  credentials: true,
}));

mongoose.connect(DB);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен! Порт: ${SERVER_PORT}`);
});
