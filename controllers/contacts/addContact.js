const Contact = require('../../models/contact');

const addContact = async (req, res) => {
  const contact = await Contact.create({
    ...req.body,
    owner: req.user,
  });

  return res.status(201).json(contact);
};
module.exports = addContact;
