const Joi = require('joi');
const { SUBSCRIPTION_TYPES } = require('../constants/constants');

const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
});

module.exports = {
  userUpdateSubscriptionSchema,
};
