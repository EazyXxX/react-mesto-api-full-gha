const index = require('express').Router();
const { errors } = require('celebrate');
const { signin, signup } = require('../controllers/users');
const { signUpValidation, signInValidation } = require('../validation/validation');
const authMiddleware = require('../middlewares/auth');
const users = require('./users');
const cards = require('./cards');
const centralCatcher = require('../middlewares/centralCatcher');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/NotFoundError');

index.use(requestLogger);

index.post('/signup', signUpValidation, signup);
index.post('/signin', signInValidation, signin);

index.use(authMiddleware);

index.use('/users', users);
index.use('/cards', cards);

index.use('*', (req, res, next) => {
  const err = new NotFoundError('Страница не существует');
  next(err);
});

index.use(errorLogger);

index.use(errors());
index.use(centralCatcher);

module.exports = index;
