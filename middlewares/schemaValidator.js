const schemaValidator = (schema, req, res, next) => {
  const { body } = req;
  const { error } = schema(body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports.schemaValidator = schemaValidator;
