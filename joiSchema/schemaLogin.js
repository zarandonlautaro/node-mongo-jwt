const Joi = require('joi');

const loginValidation = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(req);
};

module.exports.loginValidation = loginValidation;
