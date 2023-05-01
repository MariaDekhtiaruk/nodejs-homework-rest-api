const contacts = require('../../models/contacts');
const RequestError = require('../../helpers');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await contacts.getContactById(contactId);
    if (!oneContact) {
      throw RequestError(404, 'Not Found');
    }
    res.json(oneContact);
  } catch (error) {
    next(error);
  }
};
module.exports = getContactById;
