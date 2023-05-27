require('dotenv');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError());
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
