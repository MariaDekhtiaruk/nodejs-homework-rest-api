const contacts = require('../../models/contacts');

const listContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};
module.exports = listContacts;
