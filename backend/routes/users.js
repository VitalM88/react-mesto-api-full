const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patternUrl } = require('../utils/patternUrl');

const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).regex(patternUrl),
  }),
}), updateUserAvatar);

module.exports = router;
