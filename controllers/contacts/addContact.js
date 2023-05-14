const Contact = require('../../models/contact');

const addContact = async (req, res) => {
  const currentUser = req.user;
  const contact = await Contact.create(req.body);
  contact.owner = currentUser;
  contact.save();

  return res.status(201).json(contact);
};
module.exports = addContact;
