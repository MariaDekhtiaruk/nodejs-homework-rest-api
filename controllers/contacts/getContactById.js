const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  // const oneContact = await Contact.findOne({ _id: contactId }); цей метод краще, якщо шукати не по id, а наприклад по name
  const oneContact = await Contact.findOne({
    _id: contactId,
    owner: { $exists: true, $eq: req.user },
  });

  if (!oneContact) {
    throw RequestError(404, 'Not Found');
  }

  req.selectedContact = oneContact;
  next();
};
module.exports = getContactById;
