const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./utils/config');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(cors({
  origin: ['http://localhost:3000', 'https://ambernetdiploma.nomoreparties.co', 'http://ambernetdiploma.nomoreparties.co'],
  credentials: true,
}));

mongoose.connect(DB);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Сервер запущен! Порт: ${SERVER_PORT}`);
});
