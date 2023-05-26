const { Joi, celebrate } = require('celebrate');

const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    password: Joi.string().required().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
  }),
});

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2).max(30),
  }),
});

const getUserValidation = celebrate({
  body: Joi.object({
    _id: Joi.string().required().hex().length(24),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexUrl),
  }),
});

const getCardsValidation = celebrate({
  body: Joi.object().keys({
    owner: Joi.object().keys({
      _id: Joi.string().required().hex().length(24),
    }),
  }).unknown(true),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexUrl),
  }),
});

const deleteCardValidation = celebrate({
  body: Joi.object().keys({
    owner: Joi.object().keys({
      _id: Joi.string().required().hex().length(24),
    }),
  }).unknown(true),
});

const likeCardValidation = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }).unknown(true),
});

const deleteLikeCardValidation = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }).unknown(true),
});

module.exports = {
  signUpValidation, signInValidation, getUserValidation, updateUserProfileValidation, updateUserAvatarValidation, getCardsValidation, createCardValidation, deleteCardValidation, likeCardValidation, deleteLikeCardValidation,
};
