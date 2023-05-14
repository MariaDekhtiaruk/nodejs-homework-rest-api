const Contact = require('../../models/contact');

const listContacts = async (req, res) => {
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;
  const currentUser = req.user;
  const findCriteria = { owner: currentUser };

  if (favorite) {
    findCriteria.favorite = favorite;
  }

  const allContacts = await Contact.find(
    findCriteria,
    '-createdAt -updatedAt'
  )
    .skip(skip)
    .limit(limit);
  res.json(allContacts);
};
module.exports = listContacts;
