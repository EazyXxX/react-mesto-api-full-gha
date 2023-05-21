const cards = require('express').Router();
const {
  createCardValidation, deleteCardValidation, likeCardValidation, deleteLikeCardValidation,
} = require('../validation/validation');
const {
  createCard, deleteCard, likeCard, deleteLikeCard, getCards,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', createCardValidation, createCard);
cards.delete('/:cardId', deleteCardValidation, deleteCard);
cards.put('/:cardId/likes', likeCardValidation, likeCard);
cards.delete('/:cardId/likes', deleteLikeCardValidation, deleteLikeCard);

module.exports = cards;
