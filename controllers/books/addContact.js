const contactShema = require('../../schemas/books');
const contacts = require('../../models/contacts');
const RequestError = require('../../helpers');

const addContact = async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
