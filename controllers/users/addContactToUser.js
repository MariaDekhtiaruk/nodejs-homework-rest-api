const User = require('../../models/user');

const addContact = async (req, res) => {
  const { user } = req;
  const { contactId } = req.body;
  user.contacts.push({ _id: contactId });
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  }).populate('contacts');

  res.json(updatedUser.contacts);
};

module.exports = addContact;
