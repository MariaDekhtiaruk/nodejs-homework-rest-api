const contactShema = require('../../schemas/contacts');
const contacts = require('../../models/contacts');
const RequestError = require('../../helpers');

const updateContact = async (req, res) => {
  const { error } = contactShema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = updateContact;
