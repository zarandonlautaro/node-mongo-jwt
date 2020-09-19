const Joi = require('joi');

// Register Validation
const registerValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    lastname: Joi.string().min(1).required(),
    dni: Joi.string().min(1).required(),
    ages: Joi.string().min(1).required(),
    email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(req);
};

module.exports.registerValidation = registerValidation;
