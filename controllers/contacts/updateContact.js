const { RequestError } = require('../../helpers');

const updateContact = async (req, res) => {
  const selectedContact = req.selectedContact;

  // щоб повернути оновлений об'єкт потрібно поставити { new: true }, інакше Postman відобразить попереднє
  await selectedContact.set(req.body);

  // Save the updated selectedContact object
  const result = await selectedContact.save();

  if (!result) {
    throw RequestError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = updateContact;
