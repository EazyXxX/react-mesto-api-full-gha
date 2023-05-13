const express = require('express');

const corsMiddleware = express();

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://eazyxxx.front.nomoredomains.monster',
  'https://eazyxxx.front.nomoredomains.monster/sign-up',
  'https://eazyxxx.front.nomoredomains.monster/sign-in',
  'https://eazyxxx.front.nomoredomains.monster/cards',
  'https://eazyxxx.front.nomoredomains.monster/cards/',
  'https://eazyxxx.front.nomoredomains.monster/users',
  'https://eazyxxx.front.nomoredomains.monster/users/me',
  'https://eazyxxx.front.nomoredomains.monster/users/me/avatar',
  'localhost:3000',
];

corsMiddleware.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
});

module.exports = corsMiddleware;
