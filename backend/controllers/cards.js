const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => { res.send(cards); })
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  const newCard = new Card({ name, link, owner });
  newCard.save()
    .then((card) => {
      card.populate('owner');
    })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.send(new NotFoundError());
      }
      if (String(card.owner) === req.user._id) {
        Card.findByIdAndRemove(cardId)
          .then(() => res.send({ message: `Карточка ${cardId} удалена` }))
          .catch((err) => next(err));
      } else {
        next(new ConflictError());
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        console.error(err);
        return next(new BadRequestError());
      }
      console.error(err);
      return next(err);
    });
};

const updateLike = (req, res, method, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError());
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');
const deleteLikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
