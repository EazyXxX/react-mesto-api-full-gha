const index = require('express').Router();
const { errors } = require('celebrate');
const { signin, signup } = require('../controllers/users');
const { signUpValidation, signInValidation } = require('../validation/validation');
const authMiddleware = require('../middlewares/auth');
const users = require('./users');
const cards = require('./cards');
const centralCatcher = require('../middlewares/centralCatcher');
const { requestLogger, errorLogger } = require('../middlewares/logger');

index.use(requestLogger);

index.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

index.post('/signup', signUpValidation, signup);
index.post('/signin', signInValidation, signin);

index.use(authMiddleware);

index.use('/users', users);
index.use('/cards', cards);

index.use('*', (req, res, next) => {
  const err = new Error('Страница не существует');
  err.statusCode = 404;
  next(err);
});

index.use(errorLogger);

index.use(errors());
index.use(centralCatcher);

module.exports = index;
