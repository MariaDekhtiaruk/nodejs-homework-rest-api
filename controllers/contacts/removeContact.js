const { RequestError } = require('../../helpers');

const removeContact = async (req, res) => {
  const selectedContact = req.selectedContact;
  const result = await selectedContact.deleteOne();

  if (!result) {
    throw RequestError(404, 'Not Found');
  }
  res.json({ message: 'Delete success' });
};
module.exports = removeContact;
