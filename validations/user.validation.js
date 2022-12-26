const Joi = require('joi');

// 회원가입 JOI VALIDATION
exports.registerSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': 'WRONG EMAIL PATTEN',
      'any.required': 'NO EMAIL INPUT',
    }),
  nickname: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9각-힣]{2,15}$'))
    .required()
    .min(2)
    .max(15)
    .messages({
      'string.pattern.base': 'WRONG NICKNAME PATTERN',
      'string.min': 'NICKNAME BELOW STRING LENGTH 2',
      'string.max': 'NICKNAME ABOVE STRING LENGTH 15',
      'any.required': 'NO NICKNAME INPUT',
    }),
  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
});

exports.loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': 'WRONG EMAIL PATTEN',
      'any.required': 'NO EMAIL INPUT',
    }),
  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
});
