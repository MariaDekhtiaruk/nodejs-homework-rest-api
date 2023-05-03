const Joi = require('joi');

const contactSchema = {
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
};

const contactSchemaOptional = Joi.object(contactSchema);
const contactSchemaRequired = Joi.object(contactSchema).fork(
  Object.keys(contactSchema),
  (schema) => schema.required()
);

module.exports = { contactSchemaOptional, contactSchemaRequired };
