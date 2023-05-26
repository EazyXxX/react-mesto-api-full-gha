const centralCatcher = (err, req, res) => {
  if (err.statusCode !== true) {
    console.log(err);
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
  console.log(err);
  res.status(err.statusCode).send(err.message);
};

module.exports = centralCatcher;
