const Joi = require('joi');

// Register Validation
const registerValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(req);
};

const loginValidation = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(req);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
