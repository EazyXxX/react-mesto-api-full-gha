const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const EmailExistsError = require('../errors/EmailExistsError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  // достаём юзера из БДшки
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((users) => res.send(users))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError());
      }
      next(err);
    });
};

const getUser = (req, res, next) => {
  // достаём юзера из ДБшки
  User
    .findById(req.user._id)
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError());
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError());
      }
      next(err);
    });
};

const signup = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name, about, avatar, email, password: hash,
    });
    const user = ({
      name, about, avatar, email, password,
    });
    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(err);
      return next(new BadRequestError());
    } if (err.code === 11000) {
      return next(new EmailExistsError());
    }
    console.error(err);
    return next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (user === null) {
      return next(new UnauthorizedError('Указанный пользователь не найден'));
    }
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return next(new BadRequestError('Неправильный пароль'));
    }

    const token = jsonwebtoken.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    return res.send({ token });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  signup, getUser, getUsers, updateUserProfile, updateUserAvatar, signin, getUserInfo,
};
