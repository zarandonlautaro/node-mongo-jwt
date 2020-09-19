const schemaValidator = (schema, req, next) => {
  const { body } = req;
  const { error } = schema(body);
  if (error) return next(error.details[0].message);
  return next();
};

module.exports.schemaValidator = schemaValidator;
