const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // const oneContact = await Contact.findOne({ _id: contactId }); цей метод краще, якщо шукати не по id, а наприклад по name
  const oneContact = await Contact.findById(contactId);
  if (!oneContact) {
    throw RequestError(404, 'Not Found');
  }
  res.json(oneContact);
};
module.exports = getContactById;
