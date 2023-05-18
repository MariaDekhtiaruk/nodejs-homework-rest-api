const Joi = require('joi');

const contactSchema = {
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  image: Joi.string(),
};

const contactSchemaOptionalFields = {
  favorite: Joi.boolean(),
};

const contactSchemaOptional = Joi.object({
  ...contactSchema,
  ...contactSchemaOptionalFields,
});

const contactSchemaFavorites = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchemaRequired = Joi.object(contactSchema).fork(
  Object.keys(contactSchema),
  (schema) => schema.required()
);

module.exports = {
  contactSchemaOptional,
  contactSchemaRequired,
  contactSchemaFavorites,
};
